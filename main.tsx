import type { Route } from "@std/http";
import { route } from "@std/http";
import { githubOAuthHelpers, kv, makeKvOAuthRoutes } from "#/lib/kv-oauth.ts";
import { makeOAuthCallbackHandler } from "#/lib/kv/handle-oauth-callback.ts";
import { makeLinklabRoutes } from "#/routes/routes.ts";

export const routes: Route[] = [
  ...makeKvOAuthRoutes(githubOAuthHelpers, makeOAuthCallbackHandler(kv)),
  ...makeLinklabRoutes(kv, githubOAuthHelpers),
];

export const router = route(routes, defaultHandler);

export function defaultHandler(_request: Request) {
  return new Response("Not found", { status: 404 });
}

if (import.meta.main) {
  Deno.serve((request) => router(request));
}
