import type { OAuthCallbackData } from "#/lib/kv-oauth.ts";
import { setGitHubUserIDBySessionID } from "./set-github-user-id-by-session-id.ts";
import { getUserByGitHubUserID } from "./get-user-by-github-user-id.ts";
import { setUserByGitHubUserID } from "./set-user-by-github-user-id.ts";
import { setGitHubUserIDByGitHubLogin } from "./set-github-user-id-by-github-login.ts";

export function makeOAuthCallbackHandler(kv: Deno.Kv) {
  return (data: OAuthCallbackData) => handleOAuthCallback(kv, data);
}

export async function handleOAuthCallback(
  kv: Deno.Kv,
  { sessionId, tokens }: OAuthCallbackData,
) {
  // Associate the session ID with the Linklab user.
  const githubUserRequest = await fetch(
    "https://api.github.com/user",
    {
      headers: new Headers({
        Authorization: `Bearer ${tokens.accessToken}`,
      }),
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
