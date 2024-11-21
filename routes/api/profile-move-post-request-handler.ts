import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";
import { setProfileByProfileID } from "#/lib/kv/set-profile-by-profile-id.ts";
import { makeProfileLinksURL } from "#/lib/urls.ts";

/**
 * makeProfileMovePOSTRequestHandler makes an endpoint for move a profile link
 * in the profile's list of links.
 */
export function makeProfileMovePOSTRequestHandler(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Handler {
  return async function handler(request, _info, params) {
    // Check if user is signed in. Else, error.
    const sessionID = await getSessionId(request);
    if (sessionID === undefined) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the user from the session ID.
    const user = await getUserBySessionID(kv, sessionID);
    if (user.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    // Check if profile ID passed in URL pathname is owned by user.
    const profileID = params?.pathname?.groups?.id;
    if (profileID === undefined) {
      return new Response("Not found", { status: 404 });
    }

    const profile = await getProfileByProfileID(kv, profileID);
    if (profile.value === null) {
      return new Response("Not found", { status: 404 });
    }

    if (profile.value.ownerGitHubUserID !== user.value.githubID) {
      return new Response("Forbidden", { status: 403 });
    }

    const indexString = params?.pathname?.groups?.index;
    if (indexString === undefined) {
      return new Response("Bad request", { status: 400 });
    }

    const index = parseInt(indexString, 10);
    if (isNaN(index)) {
      return new Response("Bad request", { status: 400 });
    }

    const formData = await request.formData();
    const newIndexString = formData.get("newIndex")?.toString();
    if (newIndexString === undefined) {
      return new Response("Bad request", { status: 400 });
    }

    const newIndex = parseInt(newIndexString, 10);
    if (isNaN(newIndex)) {
      return new Response("Bad request", { status: 400 });
    }

    // Move the link in the profile's list of links.
    const link = profile.value.links[index];
    profile.value.links.splice(index, 1);
    profile.value.links.splice(newIndex, 0, link);
    await setProfileByProfileID(kv, profile.value);

    return new Response(null, {
      status: 303,
      headers: new Headers({ Location: makeProfileLinksURL(profileID) }),
    });
  };
}
