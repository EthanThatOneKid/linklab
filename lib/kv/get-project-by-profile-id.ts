import type { Project } from "subhosting/resources/shared";
import { kvKeyPrefixLinklab, kvKeyPrefixProfile } from "./keys.ts";

/**
 * getProjectByProfileID gets a Deno Deploy project by profile ID.
 */
export function getProjectByProfileID(
  kv: Deno.Kv,
  profileID: string,
): Promise<Deno.KvEntryMaybe<Project>> {
  return kv.get<Project>([kvKeyPrefixLinklab, kvKeyPrefixProfile, profileID]);
}
