import type { Profile } from "#/lib/profile.ts";
import { kvKeyPrefixLinklab, kvKeyPrefixProfile } from "./keys.ts";

/**
 * setProfileByProfileID sets a Linklab profile by profile ID.
 */
export function setProfileByProfileID(
  kv: Deno.Kv,
  profile: Profile,
): Promise<Deno.KvCommitResult> {
  return kv.set(
    [kvKeyPrefixLinklab, kvKeyPrefixProfile, profile.id],
    profile,
  );
}
