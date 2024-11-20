import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import type { Profile } from "#/lib/profile.ts";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { addProfileByGitHubUserID } from "#/lib/kv/add-profile-by-github-user-id.ts";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";
import { setProfileByProfileID } from "#/lib/kv/set-profile-by-profile-id.ts";
import { makeProfileURL, makeUserURL } from "#/lib/urls.ts";
import { deleteProfileByProfileID } from "#/lib/kv/delete-profile-by-profile-id.ts";

/**
 * makeProfilesHandler makes an endpoint for creating or updating a profile.
 *
 * Update if the user is the profile owner or create if the profile does not exist.
 */
export function makeProfilesAPIHandler(
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

    const profile = parseProfileFromRequest(request);
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

    // Delete the profile if it exists and the request method is DELETE.
    if (request.method === "DELETE") {
      if (
        existingProfile.value?.ownerGitHubUserID !== user.value.githubID
      ) {
        return new Response("Unauthorized", { status: 401 });
      }

      await deleteProfileByProfileID(kv, profile.id);
      return new Response(null, {
        status: 303,
        headers: new Headers({ Location: makeUserURL(user.value.githubLogin) }),
      });
    }

    // If the profile does not exist, create a new one.
    if (existingProfile.value === null) {
      const result0 = await setProfileByProfileID(kv, {
        ...profile,
        id: profile.id,
        ownerGitHubUserID: user.value.githubID,
        links: [],
      });
      if (!result0.ok) {
        return new Response("Internal server error", { status: 500 });
      }

      const result1 = await addProfileByGitHubUserID(
        kv,
        user.value.githubID,
        profile.id,
      );
      if (!result1.ok) {
        return new Response("Internal server error", { status: 500 });
      }

      return new Response(null, {
        status: 303,
        headers: new Headers({ Location: makeProfileURL(profile.id) }),
      });
    }

    // Prevent user from claiming existing profile.
    if (
      existingProfile?.value?.ownerGitHubUserID !==
        user.value.githubID
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Update the profile.
    const result2 = await setProfileByProfileID(kv, {
      ...existingProfile.value,
      ...profile,
    });
    if (!result2.ok) {
      return new Response("Internal server error", { status: 500 });
    }

    return new Response(null, {
      status: 303,
      headers: new Headers({ Location: makeProfileURL(profile.id) }),
    });
  };
}

function parseProfileFromRequest(request: Request): Partial<Profile> {
  // TODO: Refactor to use FormData.
  const { searchParams } = new URL(request.url);
  return {
    id: searchParams.get("id") ?? undefined,
    title: searchParams.get("title") ?? undefined,
    description: searchParams.get("description") ?? undefined,
    iconURL: searchParams.get("iconURL") ?? undefined,
    colorStyle: searchParams.get("colorStyle") ?? undefined,
    backgroundStyle: searchParams.get("backgroundStyle") ?? undefined,
  };
}
