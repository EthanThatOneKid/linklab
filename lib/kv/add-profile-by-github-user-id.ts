import { getUserByGitHubUserID } from "./get-user-by-github-user-id.ts";
import { setUserByGitHubUserID } from "./set-user-by-github-user-id.ts";

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
