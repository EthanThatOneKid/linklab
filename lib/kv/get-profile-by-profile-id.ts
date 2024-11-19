import type { Profile } from "#/lib/profile.ts";
import { kvKeyPrefixLinklab, kvKeyPrefixProfile } from "./keys.ts";

/**
 * getProfileByProfileID gets a Linklab profile by profile ID.
 */
export function getProfileByProfileID(
  kv: Deno.Kv,
  profileID: string,
): Promise<Deno.KvEntryMaybe<Profile>> {
  return kv.get<Profile>([kvKeyPrefixLinklab, kvKeyPrefixProfile, profileID]);
}
