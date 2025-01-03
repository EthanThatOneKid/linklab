import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getProfilesByProfileIDs } from "#/lib/kv/get-profiles-by-profile-ids.ts";
import { getUserByGitHubLogin } from "#/lib/kv/get-user-by-github-login.ts";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { UserPage } from "./user-page.tsx";

export function makeUserPageHandler(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Handler {
  return async function handler(request, _info, params) {
    const sessionID = await getSessionId(request);
    if (sessionID === undefined) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await getUserBySessionID(kv, sessionID);
    if (user.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    const login = params?.pathname?.groups?.login;
    if (login === undefined) {
      return new Response("Not found", { status: 404 });
    }

    const pageOwner = await getUserByGitHubLogin(kv, login);
    if (pageOwner.value === null) {
      return new Response("Not found", { status: 404 });
    }

    const profiles = await getProfilesByProfileIDs(
      kv,
      pageOwner.value.profilesByID,
    );
    return new Response(
      <UserPage
        user={user.value}
        pageOwner={pageOwner.value}
        profiles={profiles}
      />,
      { headers: new Headers({ "Content-Type": "text/html" }) },
    );
  };
}
