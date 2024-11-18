import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { makeProfilesRoute } from "./profiles.ts";
import { makeProfileLinkRoute } from "./profile-link.ts";
import { makeLandingPageRoute } from "./landing-page.tsx";
import { makeUserPageRoute } from "./user-page.tsx";
import { makeProfilePageRoute } from "./profile-page.tsx";
import { makeStaticRoute } from "./static.ts";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(kv: Deno.Kv, helpers: Helpers): Route[] {
  return [
    makeProfilesRoute(kv, helpers),
    makeProfileLinkRoute(kv, helpers),
    makeLandingPageRoute(kv, helpers),
    makeUserPageRoute(kv, helpers),
    makeProfilePageRoute(kv, helpers),
    makeStaticRoute(),
  ];
}
