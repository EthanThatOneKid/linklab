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
 * kvKeyPrefixGitHubUserIDByGitHubLogin is the GitHub user ID by GitHub login prefix for Deno Kv keys.
 */
export const kvKeyPrefixGitHubUserIDByGitHubLogin =
  "github-user-id-by-github-login";

/**
 * getProfileByProfileID gets a Linklab profile by profile ID.
 */
export function getProfileByProfileID(
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
  profile: Profile,
): Promise<Deno.KvCommitResult> {
  return kv.set([kvKeyPrefixLinklab, kvKeyPrefixProfile, profile.id], profile);
}

/**
 * addProfileByGitHubUserID adds a profile ID to a user's owned profile IDs.
 */
export async function addProfileByGitHubUserID(
  kv: Deno.Kv,
  githubUserID: string,
  profileID: string,
): Promise<Deno.KvCommitResult> {
  const userResult = await getUserByGitHubUserID(kv, githubUserID);
  if (userResult.value === null) {
    throw new Error("User not found");
  }

  const user = userResult.value;
  user.profilesByID.push(profileID);
  return await setUserByGitHubUserID(kv, user);
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

export function getProfilesByProfileIDs(
  kv: Deno.Kv,
  profileIDs: string[],
): Promise<Profile[]> {
  return Promise.all(
    profileIDs.map(async (profileID) => {
      const profileResult = await getProfileByProfileID(kv, profileID);
      if (profileResult.value === null) {
        throw new Error("Profile not found");
      }

      return profileResult.value;
    }),
  );
}
