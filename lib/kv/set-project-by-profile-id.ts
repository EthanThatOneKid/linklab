import type { Project } from "subhosting/resources/projects";
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
