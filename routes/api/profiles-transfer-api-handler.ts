import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";

/**
 * makeProfilesTransferAPIHandler makes an endpoint for transferring a profile to
 * another user.
 */
export function makeProfilesTransferAPIHandler(
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
      return new Response("Internal server error", { status: 500 });
    }

    // TODO: Check if profile ID passed in URL pathname is owned by user.

    throw new Error("Not implemented");
  };
}
