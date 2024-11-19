import type { User } from "#/lib/user.ts";
import { kvKeyPrefixLinklab, kvKeyPrefixUserByGitHubUserID } from "./keys.ts";

/**
 * setUserByGitHubUserID sets a Linklab user by GitHub user ID.
 */
export function setUserByGitHubUserID(
  kv: Deno.Kv,
  user: User,
): Promise<Deno.KvCommitResult> {
  return kv.set(
    [kvKeyPrefixLinklab, kvKeyPrefixUserByGitHubUserID, user.githubID],
    user,
  );
}
