import type { Route } from "@std/http";
import { serveDir } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { makeProfilesAPIHandler } from "./api/profiles-api-handler.ts";
import { makeLinksAPIHandler } from "./api/links-api-handler.ts";
import { makeProfilesMoveAPIHandler } from "./api/profiles-move-api-handler.ts";
import { makeProfilesTransferAPIHandler } from "./api/profiles-transfer-api-handler.ts";
import { makeLandingPageHandler } from "./pages/landing-page/landing-page-handler.tsx";
import { makeProfileLinksSettingsPageHandler } from "./pages/profile-links-settings-page/profile-links-settings-page-handler.tsx";
import { makeProfileGeneralSettingsPageHandler } from "./pages/profile-general-settings-page/profile-general-settings-page-handler.tsx";
import { makeUserPageHandler } from "./pages/user-page/user-page-handler.tsx";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(kv: Deno.Kv, helpers: Helpers): Route[] {
  return [
    {
      pattern: new URLPattern({ pathname: "/api/profiles" }),
      handler: makeProfilesAPIHandler(kv, helpers),
    },
    {
      pattern: new URLPattern({
        pathname: "/api/profiles/:id/links/{:index}?",
      }),
      handler: makeLinksAPIHandler(kv, helpers),
    },
    // TODO: Fix handler implementation.
    {
      pattern: new URLPattern({ pathname: "/api/profiles/:id/transfer" }),
      handler: makeProfilesTransferAPIHandler(kv, helpers),
    },
    // TODO: Fix handler implementation.
    {
      pattern: new URLPattern({ pathname: "/api/profiles/:id/move" }),
      handler: makeProfilesMoveAPIHandler(kv, helpers),
    },
    // TODO: Add more routes here.
    // - GET,POST /api/profiles/:id/deployments
    // - GET /api/profiles/:id/deployments/:deployment-id
    // - GET /api/profiles/:id/deployments/:deployment-id/logs
    //
    {
      method: "GET",
      pattern: new URLPattern({ pathname: "/" }),
      handler: makeLandingPageHandler(kv, helpers),
    },
    {
      method: "GET",
      pattern: new URLPattern({ pathname: "/profiles/:id" }),
      handler: makeProfileGeneralSettingsPageHandler(kv, helpers),
    },
    {
      method: "GET",
      pattern: new URLPattern({ pathname: "/profiles/:id/links" }),
      handler: makeProfileLinksSettingsPageHandler(kv, helpers),
    },
    {
      method: "GET",
      pattern: new URLPattern({ pathname: "/users/:login" }),
      handler: makeUserPageHandler(kv, helpers),
    },
    {
      pattern: new URLPattern({ pathname: "/static/*" }),
      handler(request) {
        return serveDir(request, { fsRoot: "./static", urlRoot: "static" });
      },
    },
  ];
}
