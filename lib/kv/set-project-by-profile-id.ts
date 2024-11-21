import type { Project } from "subhosting/resources/shared";
import { kvKeyPrefixLinklab, kvKeyPrefixProjectByProfileID } from "./keys.ts";

export function setProjectByProfileID(
  kv: Deno.Kv,
  profileID: string,
  project: Project,
): Promise<Deno.KvCommitResult> {
  return kv.set(
    [
      kvKeyPrefixLinklab,
      kvKeyPrefixProjectByProfileID,
      profileID,
    ],
    project,
  );
}
