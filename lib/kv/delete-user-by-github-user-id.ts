import { kvKeyPrefixLinklab, kvKeyPrefixUserByGitHubUserID } from "./keys.ts";

/**
 * deleteUserByGitHubUserID deletes a Linklab user by GitHub user ID.
 */
export function deleteUserByGitHubUserID(
  kv: Deno.Kv,
  githubUserID: string,
): Promise<void> {
  return kv.delete([
    kvKeyPrefixLinklab,
    kvKeyPrefixUserByGitHubUserID,
    githubUserID,
  ]);
}
