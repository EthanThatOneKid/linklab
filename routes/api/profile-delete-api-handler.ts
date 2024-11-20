import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";
import { deleteProfileByProfileID } from "#/lib/kv/delete-profile-by-profile-id.ts";
import { makeUserURL } from "#/lib/urls.ts";
import { setUserByGitHubUserID } from "#/lib/kv/set-user-by-github-user-id.ts";

export function makeProfileDeleteAPIHandler(
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

    // Delete the profile.
    await setUserByGitHubUserID(kv, {
      ...user.value,
      profilesByID: user.value.profilesByID
        .filter((id) => id !== profileID),
    });

    await deleteProfileByProfileID(kv, profileID);

    // Redirect to user page.
    return new Response(null, {
      status: 302,
      headers: { "Location": makeUserURL(user.value.githubLogin) },
    });
  };
}
