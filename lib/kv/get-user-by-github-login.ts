import type { User } from "#/lib/user.ts";
import { getGitHubUserIDByGitHubLogin } from "./get-github-user-id-by-github-login.ts";
import { getUserByGitHubUserID } from "./get-user-by-github-user-id.ts";

/**
 * getUserByGitHubLogin gets a Linklab user by GitHub login.
 */
export async function getUserByGitHubLogin(
  kv: Deno.Kv,
  githubLogin: string,
): Promise<Deno.KvEntryMaybe<User>> {
  const githubUserIDResult = await getGitHubUserIDByGitHubLogin(
    kv,
    githubLogin,
  );
  if (githubUserIDResult.value === null) {
    return githubUserIDResult;
  }

  return getUserByGitHubUserID(kv, githubUserIDResult.value);
}
