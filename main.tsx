import type { Route } from "@std/http";
import { route } from "@std/http";
import type { OAuthCallbackData } from "#/lib/kv-oauth.ts";
import { githubOAuthHelpers, kv, makeKvOAuthRoutes } from "#/lib/kv-oauth.ts";
import {
  getUserByGitHubUserID,
  setGitHubUserIDByGitHubLogin,
  setGitHubUserIDBySessionID,
  setUserByGitHubUserID,
} from "#/lib/kv-linklab.ts";
import { makeLinklabRoutes } from "#/lib/linklab-routes/linklab-routes.ts";

// Linklab is a Linktree clone.
//
// Required pages:
// - Landing page
// - Profile page
// - Profile edit page
// - Profile delete page
// - Profile list page
//

export const routes: Route[] = [
  ...makeKvOAuthRoutes(githubOAuthHelpers, handleOAuthCallback),
  ...makeLinklabRoutes(kv, githubOAuthHelpers),
];

async function handleOAuthCallback({ sessionId, tokens }: OAuthCallbackData) {
  // Associate the session ID with the Linklab user.
  const githubUserRequest = await fetch(
    "https://api.github.com/user",
    {
      headers: new Headers({ Authorization: `Bearer ${tokens.accessToken}` }),
    },
  );
  const githubUser = await githubUserRequest.json();
  const githubUserID = String(githubUser.id);
  await setGitHubUserIDBySessionID(
    kv,
    sessionId,
    githubUserID,
    tokens.expiresIn,
  );

  // Create new user if not exists.
  const user = await getUserByGitHubUserID(kv, githubUserID);
  if (user.value === null) {
    await setUserByGitHubUserID(kv, {
      githubID: githubUserID,
      githubLogin: githubUser.login,
      profilesByID: [],
    });
  }

  // Update the user's GitHub username.
  await setGitHubUserIDByGitHubLogin(kv, githubUser.login, githubUserID);
}

export const router = route(routes, defaultHandler);

export function defaultHandler(_request: Request) {
  return new Response("Not found", { status: 404 });
}

if (import.meta.main) {
  Deno.serve((request) => router(request));
}
