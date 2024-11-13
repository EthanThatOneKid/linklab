import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";

/**
 * kvKeyPrefixLinklab is the top-level prefix Deno Kv key for this program.
 */
export const kvKeyPrefixLinklab = "linklab";

/**
 * kvKeyPrefixProfile is the profile prefix for Deno Kv keys.
 */
export const kvKeyPrefixProfile = "profile";

/**
 * kvKeyPrefixGitHubUserIDBySessionID is the GitHub user ID by session ID prefix for Deno Kv keys.
 */
export const kvKeyPrefixGitHubUserIDBySessionID =
  "github-user-id-by-session-id";

/**
 * kvKeyPrefixUserByGitHubUserID is the user by GitHub user ID prefix for Deno Kv keys.
 */
export const kvKeyPrefixUserByGitHubUserID = "user-by-github-user-id";

/**
 * getProfileByID gets a Linklab profile by profile ID.
 */
export function getProfileByID(
  kv: Deno.Kv,
  profileID: string,
): Promise<Deno.KvEntryMaybe<Profile>> {
  return kv.get<Profile>([kvKeyPrefixLinklab, kvKeyPrefixProfile, profileID]);
}

/**
 * setProfileByID sets a Linklab profile by profile ID.
 */
export function setProfileByID(
  kv: Deno.Kv,
  profileID: string,
  profile: Profile,
): Promise<Deno.KvCommitResult> {
  return kv.set([kvKeyPrefixLinklab, kvKeyPrefixProfile, profileID], profile);
}

/**
 * deleteProfileByID deletes a Linklab profile by profile ID.
 */
export function deleteProfileByID(
  kv: Deno.Kv,
  profileID: string,
): Promise<void> {
  return kv.delete([kvKeyPrefixLinklab, kvKeyPrefixProfile, profileID]);
}

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
