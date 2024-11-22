import type { Route } from "@std/http";
import { serveDir } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { makeProfilesPOSTRequestHandler } from "./api/profiles-post-request-handler.tsx";
import { makeLinksPOSTRequestHandler } from "./api/links-post-request-handler.ts";
import { makeProfileDELETERequestHandler } from "./api/profile-delete-request-handler.ts";
import { makeLinkDELETERequestHandler } from "./api/link-delete-request-handler.ts";
import { makeProfileMovePOSTRequestHandler } from "./api/profile-move-post-request-handler.ts";
import { makeLandingPageHandler } from "./pages/landing-page/landing-page-handler.tsx";
import { makeUserPageHandler } from "./pages/user-page/user-page-handler.tsx";
import { makeProfileGeneralSettingsPageHandler } from "./pages/profile-general-settings-page/profile-general-settings-page-handler.tsx";
import { makeProfileLinksSettingsPageHandler } from "./pages/profile-links-settings-page/profile-links-settings-page-handler.tsx";
import { makeProfileSettingDeploymentsPageHandler } from "./pages/profile-settings-deployments-page/profile-settings-deployments-page-handler.tsx";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(kv: Deno.Kv, helpers: Helpers): Route[] {
  return [
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/api/profiles" }),
      handler: makeProfilesPOSTRequestHandler(kv, helpers),
    },
    {
      method: "POST",
      pattern: new URLPattern({
        pathname: "/api/profiles/:id/links{/:index}?",
      }),
      handler: makeLinksPOSTRequestHandler(kv, helpers),
    },
    // // TODO: Fix handler implementation.
    // {
    //   pattern: new URLPattern({ pathname: "/api/profiles/:id/transfer" }),
    //   handler: makeProfilesTransferAPIHandler(kv, helpers),
    // },
    // // TODO: Fix handler implementation.
    // {
    //   pattern: new URLPattern({ pathname: "/api/profiles/:id/move" }),
    //   handler: makeProfilesMoveAPIHandler(kv, helpers),
    // },
    {
      method: "POST",
      pattern: new URLPattern({
        pathname: "/api/profiles/:id/links/:index/move",
      }),
      handler: makeProfileMovePOSTRequestHandler(kv, helpers),
    },
    // TODO: Add more routes here.
    // - POST /api/profiles/:id/delete deletes a profile
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/api/profiles/:id/delete" }),
      handler: makeProfileDELETERequestHandler(kv, helpers),
    },
    //
    // - POST /api/profiles/:id/transfer transfers a profile
    // - POST /api/profiles/:id/move moves a link
    // - POST /api/profiles/:id/links creates a new link
    // - POST /api/profiles/:id/links/:index/delete deletes a link
    {
      method: "POST",
      pattern: new URLPattern({
        pathname: "/api/profiles/:id/links/:index/delete",
      }),
      handler: makeLinkDELETERequestHandler(kv, helpers),
    },
    // - GET /api/profiles/:id/deployments/:deployment-id gets a deployment
    // - GET /api/profiles/:id/deployments/:deployment-id/logs gets deployment logs
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
      pattern: new URLPattern({ pathname: "/profiles/:id/deployments" }),
      handler: makeProfileSettingDeploymentsPageHandler(kv, helpers),
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
