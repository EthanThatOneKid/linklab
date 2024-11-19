import {
  kvKeyPrefixGitHubUserIDBySessionID,
  kvKeyPrefixLinklab,
} from "./keys.ts";

/**
 * setGitHubUserIDBySessionID sets a GitHub user ID by session ID.
 */
export function setGitHubUserIDBySessionID(
  kv: Deno.Kv,
  sessionID: string,
  githubUserID: string,
  expireIn?: number,
): Promise<Deno.KvCommitResult> {
  return kv.set(
    [kvKeyPrefixLinklab, kvKeyPrefixGitHubUserIDBySessionID, sessionID],
    githubUserID,
    { expireIn },
  );
}
