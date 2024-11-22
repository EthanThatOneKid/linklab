import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import type { Profile, ProfileLink } from "#/lib/profile.ts";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { setProfileByProfileID } from "#/lib/kv/set-profile-by-profile-id.ts";
import { makeLinksURL } from "#/lib/urls.ts";
import { clean } from "#/lib/ammonia.ts";
import { createDeployment } from "#/lib/create-deployment.tsx";
import { getProjectByProfileID } from "#/lib/kv/get-project-by-profile-id.ts";

export function makeLinksPOSTRequestHandler(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Handler {
  return async function handler(request, _info, params) {
    // Check if user is signed in.
    const sessionID = await getSessionId(request);
    if (sessionID === undefined) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the user from the session ID.
    const user = await getUserBySessionID(kv, sessionID);
    if (user.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    // Get the profile ID from the request.
    const profileID = params?.pathname?.groups?.id;
    if (profileID === undefined) {
      return new Response("Not found", { status: 404 });
    }

    // Get the profile from the profile ID.
    const profile = await getProfileByProfileID(kv, profileID);
    if (profile.value === null) {
      return new Response("Not found", { status: 404 });
    }

    // Error if the profile is not owned by the user.
    if (profile.value.ownerGitHubUserID !== user.value.githubID) {
      return new Response("Forbidden", { status: 403 });
    }

    // Parse the link data from the request.
    const formData = await request.formData();
    const profileLink = parseProfileLinkFormData(formData);
    if (profileLink === null) {
      // TODO: Fix bug.
      console.log("Bad request", { profileLink });
      return new Response("Bad request", { status: 400 });
    }

    // Get the link index from the request.
    const index = params?.pathname?.groups?.index;
    const profileLinks = profile.value.links ?? [];
    if (index === undefined) {
      // Add the link at the end of the list.
      profileLinks.push(profileLink);
    } else {
      const indexNumber = parseInt(index, 10);
      if (isNaN(indexNumber)) {
        // TODO: Fix bug.
        console.log("Bad request", { index });
        return new Response("Bad request", { status: 400 });
      }

      // Update the profile link.
      profileLinks[indexNumber] = profileLink;
    }

    const newProfile: Profile = { ...profile.value, links: profileLinks };
    const result = await setProfileByProfileID(kv, newProfile);
    if (!result.ok) {
      return new Response("Internal server error", { status: 500 });
    }

    // Deploy the updated profile.
    const project = await getProjectByProfileID(kv, profileID);
    if (project.value === null) {
      throw new Error("Project not found");
    }

    await createDeployment(project.value.id, newProfile);

    return new Response(null, {
      status: 303,
      headers: new Headers({ Location: makeLinksURL(profileID) }),
    });
  };
}

function parseProfileLinkFormData(formData: FormData): ProfileLink {
  const url = formData.get("url");
  if (url === null) {
    throw new Error("Missing URL");
  }

  const title = formData.get("title");
  if (title === null) {
    throw new Error("Missing title");
  }

  const iconURL = formData.get("iconURL");
  if (iconURL === null) {
    throw new Error("Missing icon URL");
  }

  return {
    url: clean(url.toString()),
    title: clean(title.toString()),
    iconURL: clean(iconURL.toString()),
  };
}
