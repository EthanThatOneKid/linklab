import {
  kvKeyPrefixGitHubUserIDByGitHubLogin,
  kvKeyPrefixLinklab,
} from "./keys.ts";

/**
 * getGitHubUserIDByGitHubLogin gets a GitHub user ID by GitHub login.
 */
export function getGitHubUserIDByGitHubLogin(
  kv: Deno.Kv,
  githubLogin: string,
): Promise<Deno.KvEntryMaybe<string>> {
  return kv.get<string>([
    kvKeyPrefixLinklab,
    kvKeyPrefixGitHubUserIDByGitHubLogin,
    githubLogin,
  ]);
}
