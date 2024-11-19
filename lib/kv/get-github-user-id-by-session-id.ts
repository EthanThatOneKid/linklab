import {
  kvKeyPrefixGitHubUserIDBySessionID,
  kvKeyPrefixLinklab,
} from "./keys.ts";

/**
 * getGitHubUserIDBySessionID gets a GitHub user ID by session ID.
 */
export function getGitHubUserIDBySessionID(
  kv: Deno.Kv,
  sessionID: string,
): Promise<Deno.KvEntryMaybe<string>> {
  return kv.get<string>([
    kvKeyPrefixLinklab,
    kvKeyPrefixGitHubUserIDBySessionID,
    sessionID,
  ]);
}
