import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import type { Profile } from "#/lib/profile.ts";
import {
  addProfileByGitHubUserID,
  getProfileByProfileID,
  getProfilesByProfileIDs,
  getUserByGitHubLogin,
  getUserBySessionID,
  setProfileByID,
} from "#/lib/kv-linklab.ts";
import { LandingPage } from "#/components/landing-page/landing-page.tsx";
import { ProfilePage } from "#/components/profile-page/profile-page.tsx";
import { UserPage } from "#/components/user-page/user-page.tsx";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(kv: Deno.Kv, helpers: Helpers): Route[] {
  return [
    makeLandingPageRoute(kv, helpers),
    makeProfileRoute(kv, helpers),
    makeUserPageRoute(kv, helpers),
    makeProfilePageRoute(helpers, kv),
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
    pattern: new URLPattern({ pathname: "/:id" }),
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

      const profile = await getProfileByProfileID(kv, profileID);
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

/**
 * makeProfileRoute makes an endpoint for creating or updating a profile.
 *
 * Update if the user is the profile owner or create if the profile does not exist.
 */
export function makeProfileRoute(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Route {
  return {
    pattern: new URLPattern({ pathname: "/claim" }),
    async handler(request) {
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

      // Get the profile data from the request.
      const profile = parseProfileFromRequest(request);
      if (profile.id === undefined) {
        return new Response("Bad request", { status: 400 });
      }

      // Prevent user from claiming profile with blocklisted ID.
      const blocklist = new Set(["", "claim", "users"]);
      if (blocklist.has(profile.id)) {
        return new Response("Bad request", { status: 400 });
      }

      // Prevent user from claiming profile with invalid ID.
      if (!/^[a-z0-9-]+$/.test(profile.id)) {
        return new Response("Bad request", { status: 400 });
      }

      // Check if the profile ID is claimed.
      const existingProfile = await getProfileByProfileID(kv, profile.id);

      // If the profile does not exist, create a new one.
      if (existingProfile.value === null) {
        const result0 = await setProfileByID(kv, {
          ...profile,
          id: profile.id,
          ownerGitHubUserID: user.value.githubID,
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
          headers: new Headers({ Location: `/${profile.id}` }),
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
      const result = await setProfileByID(kv, {
        ...existingProfile.value,
        ...profile,
      });
      if (!result.ok) {
        return new Response("Internal server error", { status: 500 });
      }

      return new Response(null, {
        status: 303,
        headers: new Headers({ Location: `/${profile.id}` }),
      });
    },
  };
}

function parseProfileFromRequest(request: Request): Partial<Profile> {
  // TODO: Refactor to use FormData.
  const { searchParams } = new URL(request.url);
  return {
    id: searchParams.get("id") as string,
    title: searchParams.get("title") as string,
    description: searchParams.get("description") as string,
    iconURL: searchParams.get("iconURL") as string,
    colorStyle: searchParams.get("colorStyle") as string,
    backgroundStyle: searchParams.get("backgroundStyle") as string,
  };
}

/**
 * makePostProfileLinkRoute makes a POST endpoint for creating or updating a profile link.
 */
// export function makePostProfileLinkRoute()

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
