import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { LandingPage } from "#/components/landing-page/landing-page.tsx";
import { ProfilePage } from "#/components/profile-page/profile-page.tsx";
import {
  getProfileByID,
  getUserByGitHubLogin,
  getUserBySessionID,
} from "#/lib/kv-linklab.ts";
import { UserPage } from "#/components/user-page/user-page.tsx";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(kv: Deno.Kv, helpers: Helpers): Route[] {
  return [
    makeLandingPageRoute(kv, helpers),
    makePostProfileRoute(kv, helpers),
    makeUserPageRoute(kv, helpers),
  ];
}

export function makeLandingPageRoute(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Route {
  return {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    async handler(request) {
      const sessionID = await getSessionId(request);
      if (sessionID === undefined) {
        return new Response(
          <LandingPage />,
          { headers: new Headers({ "Content-Type": "text/html" }) },
        );
      }

      const user = await getUserBySessionID(kv, sessionID);
      if (user.value === null) {
        return new Response("Internal server error", { status: 500 });
      }

      return new Response(
        <LandingPage user={user.value} />,
        { headers: new Headers({ "Content-Type": "text/html" }) },
      );
    },
  };
}

export function makeProfilePageRoute(
  { getSessionId }: Helpers,
  kv: Deno.Kv,
): Route {
  return {
    method: "GET",
    pattern: new URLPattern({ pathname: "/profile/:id" }),
    async handler(request, _info, params) {
      const sessionID = await getSessionId(request);
      if (sessionID === undefined) {
        return new Response("Unauthorized", { status: 401 });
      }

      const user = await getUserBySessionID(kv, sessionID);
      if (user.value === null) {
        return new Response("Internal server error", { status: 500 });
      }

      const profileID = params?.pathname?.groups?.id;
      if (profileID === undefined) {
        return new Response("Not found", { status: 404 });
      }

      const profile = await getProfileByID(kv, profileID);
      if (profile.value === null) {
        return new Response("Not found", { status: 404 });
      }

      return new Response(
        <ProfilePage profile={profile.value} />,
        { headers: new Headers({ "Content-Type": "text/html" }) },
      );
    },
  };
}

export function makePostProfileRoute(
  _kv: Deno.Kv,
  { getSessionId }: Helpers,
): Route {
  return {
    method: "POST",
    pattern: new URLPattern({ pathname: "/profile" }),
    async handler(request) {
      // Check if user is signed in.
      const sessionID = await getSessionId(request);
      if (sessionID === undefined) {
        return new Response("Unauthorized", { status: 401 });
      }

      // Use session ID to get GitHub user ID.
      // Use GitHub user ID to get Linklab user data.
      // If profile exists, confirm the user is the owner.

      // Set profile value.
      return new Response("Unimplemented", { status: 501 });
    },
  };
}

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
      console.log({ user, pageOwner, login });
      if (pageOwner.value === null) {
        return new Response("Not found", { status: 404 });
      }

      console.log({ pageOwner });
      return new Response(
        <UserPage user={user.value} pageOwner={pageOwner.value} />,
        { headers: new Headers({ "Content-Type": "text/html" }) },
      );
    },
  };
}
