import {
  kvKeyPrefixGitHubUserIDByGitHubLogin,
  kvKeyPrefixLinklab,
} from "./keys.ts";

/**
 * setGitHubUserIDByGitHubLogin sets a GitHub user ID by GitHub login.
 */
export function setGitHubUserIDByGitHubLogin(
  kv: Deno.Kv,
  githubLogin: string,
  githubUserID: string,
): Promise<Deno.KvCommitResult> {
  return kv.set(
    [kvKeyPrefixLinklab, kvKeyPrefixGitHubUserIDByGitHubLogin, githubLogin],
    githubUserID,
  );
}
