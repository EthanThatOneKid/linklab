import type { Route } from "@std/http";
import { serveDir } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { makeLandingPageHandler } from "./landing-page.tsx";
import { makeProfilesHandler } from "./profiles.ts";
import { makeProfileLinkHandler } from "./profile-link.ts";
import { makeProfilePageHandler } from "./profile-page.tsx";
import { makeUserPageHandler } from "./user-page.tsx";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(kv: Deno.Kv, helpers: Helpers): Route[] {
  return [
    {
      pattern: new URLPattern({ pathname: "/" }),
      handler: makeLandingPageHandler(kv, helpers),
    },
    {
      pattern: new URLPattern({ pathname: "/profiles" }),
      handler: makeProfilesHandler(kv, helpers),
    },
    {
      pattern: new URLPattern({ pathname: "/profiles/:id" }),
      handler: makeProfilePageHandler(kv, helpers),
    },
    {
      pattern: new URLPattern({ pathname: "/profiles/:id/links/{:index}?" }),
      handler: makeProfileLinkHandler(kv, helpers),
    },
    {
      pattern: new URLPattern({ pathname: "/users/:login" }),
      handler: makeUserPageHandler(kv, helpers),
    },
    {
      pattern: new URLPattern({ pathname: "/static/(.*)" }),
      handler(request) {
        return serveDir(request, { fsRoot: "./static", urlRoot: "static" });
      },
    },
  ];
}
