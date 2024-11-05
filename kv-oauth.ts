import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { createGitHubOAuthConfig, createHelpers } from "@deno/kv-oauth";

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
