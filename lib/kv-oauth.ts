import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { createGitHubOAuthConfig, createHelpers } from "@deno/kv-oauth";

export const DENO_KV_PATH_KEY = "DENO_KV_PATH";
let path = undefined;
if (
  (await Deno.permissions.query({ name: "env", variable: DENO_KV_PATH_KEY }))
    .state === "granted"
) {
  path = Deno.env.get(DENO_KV_PATH_KEY);
}

/**
 * kv is a key-value store. This instance is shared across the program.
 *
 * @see
 * https://jsr.io/@deno/kv-oauth/0.11.0/lib/_kv.ts#L2
 */
export const kv = await Deno.openKv(path);

export const githubOAuthHelpers = createHelpers(createGitHubOAuthConfig());

/**
 * makeKvOAuthRoutes makes an array of Routes.
 *
 * @see
 * https://github.com/denoland/deno_kv_oauth/blob/24a23028c560d94dfde6866bfe0535a984a80dc5/README.md?plain=1#L203
 */
export function makeKvOAuthRoutes(
  { signIn, handleCallback, signOut, getSessionId }: Helpers,
): Route[] {
  return [
    {
      pattern: new URLPattern({ pathname: "/signin" }),
      async handler(request) {
        return await signIn(request);
      },
    },
    {
      pattern: new URLPattern({ pathname: "/callback" }),
      async handler(request) {
        // Return object also includes `accessToken` and `sessionId` properties.
        const { response } = await handleCallback(request);
        return response;
      },
    },
    {
      pattern: new URLPattern({ pathname: "/signout" }),
      async handler(request) {
        return await signOut(request);
      },
    },
    {
      pattern: new URLPattern({ pathname: "/protected" }),
      async handler(request) {
        return await getSessionId(request) === undefined
          ? new Response("Unauthorized", { status: 401 })
          : new Response("You are allowed");
      },
    },
  ];
}
