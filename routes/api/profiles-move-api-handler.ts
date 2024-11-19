import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";

/**
 * makeProfilesMoveAPIHandler makes an endpoint for move a profile link in
 * the profile's list of links.
 */
export function makeProfilesMoveAPIHandler(
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

    // Get the link index from the request.
    throw new Error("Not implemented");
  };
}
