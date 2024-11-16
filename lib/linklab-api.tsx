import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { LandingPage } from "#/components/landing-page/landing-page.tsx";
import { ProfilePage } from "#/components/profile-page/profile-page.tsx";
import { UserPage } from "#/components/user-page/user-page.tsx";
import {
  getProfileByProfileID,
  getProfilesByProfileIDs,
  getUserByGitHubLogin,
  getUserBySessionID,
  setProfileByID,
} from "#/lib/kv-linklab.ts";
import { Profile } from "#/lib/profile.ts";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(kv: Deno.Kv, helpers: Helpers): Route[] {
  return [
    makeLandingPageRoute(kv, helpers),
    makeProfileRoute(kv, helpers),
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
      const formData = await request.formData();

      // TODO: Fix this error.
      //
      // TypeError: Missing content type
      // at packageData (ext:deno_fetch/22_body.js:399:13)
      // at consumeBody (ext:deno_fetch/22_body.js:260:12)
      // at Request.formData (ext:deno_fetch/22_body.js:330:16)
      // at Object.handler (file:///C:/Users/ethan/Documents/GitHub/linklab/lib/linklab-api.tsx:116:38)
      // at eventLoopTick (ext:core/01_core.js:175:7)
      // at async ext:deno_http/00_serve.ts:376:18
      //

      const profile = parseProfileFormData(formData);
      if (profile.id === undefined) {
        return new Response("Bad request", { status: 400 });
      }

      // Check if the user is the profile owner.
      const existingProfile = await getProfileByProfileID(kv, profile.id);
      if (existingProfile.value === null) {
        return new Response("Not found", { status: 404 });
      }

      // Prevent user from claiming existing profile.
      if (existingProfile.value.owner.githubID !== user.value.githubID) {
        return new Response("Unauthorized", { status: 401 });
      }

      // Create or update the profile.
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

function parseProfileFormData(formData: FormData): Partial<Profile> {
  return {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    iconURL: formData.get("iconURL") as string,
    colorStyle: formData.get("colorStyle") as string,
    backgroundStyle: formData.get("backgroundStyle") as string,
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
        pageOwner.value.ownedProfiles,
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
