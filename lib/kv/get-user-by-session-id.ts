import type { User } from "#/lib/user.ts";
import { getGitHubUserIDBySessionID } from "./get-github-user-id-by-session-id.ts";
import { getUserByGitHubUserID } from "./get-user-by-github-user-id.ts";

/**
 * getUserBySessionID gets a Linklab user by session ID.
 */
export async function getUserBySessionID(
  kv: Deno.Kv,
  sessionID: string,
): Promise<Deno.KvEntryMaybe<User>> {
  const githubUserIDResult = await getGitHubUserIDBySessionID(kv, sessionID);
  if (githubUserIDResult.value === null) {
    return githubUserIDResult;
  }

  return getUserByGitHubUserID(kv, githubUserIDResult.value);
}
