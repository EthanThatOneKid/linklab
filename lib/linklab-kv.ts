import type { Route } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import type { Profile } from "#/lib/profile.ts";

/**
 * makeLinklabRoutes makes an array of Routes for Linklab.
 */
export function makeLinklabRoutes(
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
 * kvKeyPrefixLinklab is the top-level prefix for Linklab Deno Kv keys.
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
