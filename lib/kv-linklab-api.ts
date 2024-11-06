import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";

/**
 * makeLinklabAPIRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabAPIRoutes(
  { /* signIn, handleCallback, signOut, */ getSessionId }: Helpers,
  _kv: Deno.Kv,
): Route[] {
  return [
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/profile" }),
      async handler(request) {
        // Check if user is signed in.
        const sessionID = await getSessionId(request);
        if (sessionID === undefined) {
          return new Response("Unauthorized", { status: 401 });
        }

        // Use session ID to get GitHub user ID.
        // Use GitHub user ID to get Linklab user data.
        // If profile exists, confirm the user is the owner.

        // Set profile value.
        return new Response("Unimplemented", { status: 501 });
      },
    },
  ];
}

/**
 * getUserByGitHubSessionID gets a Linklab user by GitHub session ID.
 */
export async function getUserByGitHubSessionID(
  kv: Deno.Kv,
  sessionID: string,
): Promise<Deno.KvEntryMaybe<User>> {
  const githubUserRequest = await fetch(
    "https://api.github.com/user",
    { headers: new Headers({ Authorization: `Bearer ${sessionID}` }) },
  );
  const githubUser = await githubUserRequest.json();
  console.log("GitHub user:", githubUser);
  // GitHub user: {
  //   message: "Bad credentials",
  //   documentation_url: "https://docs.github.com/rest",
  //   status: "401"
  // }
  // TypeError: Cannot read properties of undefined (reading 'toString')
  //

  const githubUserID = githubUser.id.toString();
  return getUserByGitHubUserID(kv, githubUserID);
}

/**
 * kvKeyPrefixLinklab is the top-level prefix Deno Kv key for this program.
 */
export const kvKeyPrefixLinklab = "linklab";

/**
 * kvKeyPrefixProfile is the profile prefix for Deno Kv keys.
 */
export const kvKeyPrefixProfile = "profile";

/**
 * kvKeyPrefixUser is the user prefix for Deno Kv keys.
 */
export const kvKeyPrefixUser = "user";

/**
 * getProfileByID gets a Linklab profile by ID.
 */
export function getProfileByID(
  kv: Deno.Kv,
  id: string,
): Promise<Deno.KvEntryMaybe<Profile>> {
  return kv.get<Profile>([kvKeyPrefixLinklab, kvKeyPrefixProfile, id]);
}

/**
 * setProfileByID sets a Linklab profile by ID.
 */
export function setProfileByID(
  kv: Deno.Kv,
  id: string,
  profile: Profile,
): Promise<Deno.KvCommitResult> {
  return kv.set(
    [kvKeyPrefixLinklab, kvKeyPrefixProfile, id],
    profile,
  );
}

/**
 * deleteProfileByID deletes a Linklab profile by ID.
 */
export function deleteProfileByID(
  kv: Deno.Kv,
  id: string,
): Promise<void> {
  return kv.delete([kvKeyPrefixLinklab, kvKeyPrefixProfile, id]);
}

/**
 * getUserByGitHubUserID gets a Linklab user by GitHub user ID.
 */
export function getUserByGitHubUserID(
  kv: Deno.Kv,
  githubUserID: string,
): Promise<Deno.KvEntryMaybe<User>> {
  return kv.get<User>([kvKeyPrefixLinklab, kvKeyPrefixUser, githubUserID]);
}

/**
 * setUserByGitHubUserID sets a Linklab user by GitHub user ID.
 */
export function setUserByGitHubUserID(
  kv: Deno.Kv,
  user: User,
): Promise<Deno.KvCommitResult> {
  return kv.set(
    [kvKeyPrefixLinklab, kvKeyPrefixUser, user.githubID],
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
  return kv.delete([kvKeyPrefixLinklab, kvKeyPrefixUser, githubUserID]);
}
