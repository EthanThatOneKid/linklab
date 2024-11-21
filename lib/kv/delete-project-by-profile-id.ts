import { kvKeyPrefixLinklab, kvKeyPrefixProjectByProfileID } from "./keys.ts";

/**
 * deleteProjectByProfileID deletes a project by profile ID.
 */
export function deleteProjectByProfileID(
  kv: Deno.Kv,
  profileID: string,
): Promise<void> {
  return kv.delete([
    kvKeyPrefixLinklab,
    kvKeyPrefixProjectByProfileID,
    profileID,
  ]);
}
