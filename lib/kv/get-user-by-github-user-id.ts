import type { User } from "#/lib/user.ts";
import { kvKeyPrefixLinklab, kvKeyPrefixUserByGitHubUserID } from "./keys.ts";

/**
 * getUserByGitHubUserID gets a Linklab user by GitHub user ID.
 */
export function getUserByGitHubUserID(
  kv: Deno.Kv,
  githubUserID: string,
): Promise<Deno.KvEntryMaybe<User>> {
  return kv.get<User>([
    kvKeyPrefixLinklab,
    kvKeyPrefixUserByGitHubUserID,
    githubUserID,
  ]);
}
