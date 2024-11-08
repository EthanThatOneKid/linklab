import type { Route } from "@std/http";
import { route } from "@std/http";
import { githubOAuthHelpers, kv, makeKvOAuthRoutes } from "#/lib/kv-oauth.ts";
import {
  getUserByGitHubSessionID,
  makeLinklabAPIRoutes,
} from "#/lib/kv-linklab-api.ts";
import { LandingPage } from "#/components/landing_page/landing_page.tsx";
import { ProfilePage } from "#/components/profile_page/profile_page.tsx";
import { fakeProfile } from "./fake_profile.ts";

// Linklab is a Linktree clone.
//
// Required pages:
// - Landing page
// - Profile page
// - Profile edit page
// - Profile delete page
// - Profile list page
//

export const routes: Route[] = [
  ...makeKvOAuthRoutes(githubOAuthHelpers),
  ...makeLinklabAPIRoutes(githubOAuthHelpers, kv),
  {
    pattern: new URLPattern({ pathname: "/" }),
    async handler(request) {
      const sessionID = await githubOAuthHelpers.getSessionId(request);
      if (sessionID === undefined) {
        return new Response(
          <LandingPage />,
          { headers: new Headers({ "Content-Type": "text/html" }) },
        );
      }

      const user = await getUserByGitHubSessionID(kv, sessionID);
      if (user.value === null) {
        return new Response("Internal server error", { status: 500 });
      }

      return new Response(
        <LandingPage user={user.value} />,
        { headers: new Headers({ "Content-Type": "text/html" }) },
      );
    },
  },
  {
    pattern: new URLPattern({ pathname: "/profile" }),
    async handler(request) {
      // Check if user is signed in.
      const sessionID = await githubOAuthHelpers.getSessionId(request);
      if (sessionID === undefined) {
        return new Response(
          "You are not signed in",
          { status: 401 },
        );
      }

      return new Response(
        <ProfilePage profile={fakeProfile} />,
        { headers: new Headers({ "Content-Type": "text/html" }) },
      );
    },
  },
];

export function defaultHandler(_request: Request) {
  return new Response(
    "Not found",
    { status: 404 },
  );
}

export const router = route(routes, defaultHandler);

if (import.meta.main) {
  Deno.serve((request) => router(request));
}
