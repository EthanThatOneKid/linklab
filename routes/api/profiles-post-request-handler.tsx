import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { subhosting } from "#/lib/subhosting.ts";
import { clean } from "#/lib/ammonia.ts";
import type { Profile } from "#/lib/profile.ts";
import { makeProfileURL } from "#/lib/urls.ts";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { addProfileByGitHubUserID } from "#/lib/kv/add-profile-by-github-user-id.ts";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";
import { setProfileByProfileID } from "#/lib/kv/set-profile-by-profile-id.ts";
import { getProjectByProfileID } from "#/lib/kv/get-project-by-profile-id.ts";
import { setProjectByProfileID } from "#/lib/kv/set-project-by-profile-id.ts";
import { createDeployment } from "#/lib/create-deployment.tsx";

/**
 * makeProfilesPOSTRequestHandler makes an endpoint for creating or updating a
 * profile.
 *
 * Update if the user is the profile owner or create if the profile does not exist.
 */
export function makeProfilesPOSTRequestHandler(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Handler {
  return async function handler(request) {
    // Check if user is signed in. Else, redirect to /signin.
    const sessionID = await getSessionId(request);
    if (sessionID === undefined) {
      return new Response(null, {
        status: 303,
        headers: new Headers({ Location: "/signin" }),
      });
    }

    // Get the user from the session ID.
    const user = await getUserBySessionID(kv, sessionID);
    if (user.value === null) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const profile = parseProfileFormData(formData);
    if (profile.id === undefined) {
      return new Response("Bad request", { status: 400 });
    }

    // Prevent user from claiming profile with blocklisted ID.
    const blocklist = new Set(["", "profiles", "users"]);
    if (blocklist.has(profile.id)) {
      return new Response("Bad request", { status: 400 });
    }

    // Prevent user from claiming profile with invalid ID.
    if (!/^[a-z0-9-]+$/.test(profile.id)) {
      return new Response("Bad request", { status: 400 });
    }

    // Check if the profile ID is claimed.
    const existingProfile = await getProfileByProfileID(kv, profile.id);

    let newProfile: Profile;
    if (existingProfile.value === null) {
      newProfile = {
        ...profile,
        id: profile.id,
        ownerGitHubUserID: user.value.githubID,
        links: [],
      };

      const result0 = await addProfileByGitHubUserID(
        kv,
        user.value.githubID,
        profile.id,
      );
      if (!result0.ok) {
        return new Response("Internal server error", { status: 500 });
      }

      // Create a project for the profile.
      const project = await subhosting.organizations.projects.create(
        Deno.env.get("DEPLOY_ORG_ID")!,
        {},
      );

      // Associate the profile with the project.
      const result1 = await setProjectByProfileID(
        kv,
        profile.id,
        project,
      );
      if (!result1.ok) {
        return new Response("Internal server error", { status: 500 });
      }
    } else {
      // Prevent user from claiming existing profile.
      if (
        existingProfile?.value?.ownerGitHubUserID !==
          user.value.githubID
      ) {
        return new Response("Unauthorized", { status: 401 });
      }

      newProfile = { ...existingProfile.value, ...profile };
    }

    const result = await setProfileByProfileID(kv, newProfile);
    if (!result.ok) {
      return new Response("Internal server error", { status: 500 });
    }

    // Deploy the project.
    const project = await getProjectByProfileID(kv, profile.id);
    if (project.value === null) {
      throw new Error("Project not found");
    }

    await createDeployment(project.value.id, newProfile);
    return new Response(null, {
      status: 303,
      headers: new Headers({ Location: makeProfileURL(profile.id) }),
    });
  };
}

export function parseProfileFormData(formData: FormData): Partial<Profile> {
  const profile: Partial<Profile> = {};
  profileKeys.forEach((key) => {
    const value = formData.get(key);
    if (value === null) {
      return;
    }

    profile[key as typeof profileKeys[number]] = clean(value.toString());
  });
  return profile;
}

const profileKeys = [
  "id",
  "title",
  "description",
  "iconURL",
  "colorStyle",
  "backgroundStyle",
] as const;
