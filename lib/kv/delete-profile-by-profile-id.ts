import { kvKeyPrefixLinklab, kvKeyPrefixProfile } from "./keys.ts";

/**
 * deleteProfileByProfileID deletes a Linklab profile by profile ID.
 */
export function deleteProfileByProfileID(
  kv: Deno.Kv,
  profileID: string,
): Promise<void> {
  return kv.delete([kvKeyPrefixLinklab, kvKeyPrefixProfile, profileID]);
}
