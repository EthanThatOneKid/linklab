import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import {
  getProfilesByProfileIDs,
  getUserByGitHubLogin,
  getUserBySessionID,
} from "#/lib/kv-linklab.ts";
import { UserPage } from "#/components/user-page/user-page.tsx";

export function makeUserPageRoute(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Route {
  return {
    method: "GET",
    pattern: new URLPattern({ pathname: "/users/:login" }),
    async handler(request, _info, params) {
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
    },
  };
}
