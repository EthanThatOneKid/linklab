import type { Profile } from "#/lib/profile.ts";
import { getProfileByProfileID } from "./get-profile-by-profile-id.ts";

export function getProfilesByProfileIDs(
  kv: Deno.Kv,
  profileIDs: string[],
): Promise<Profile[]> {
  return Promise.all(
    profileIDs.map(async (profileID) => {
      const profileResult = await getProfileByProfileID(kv, profileID);
      if (profileResult.value === null) {
        throw new Error("Profile not found");
      }

      return profileResult.value;
    }),
  );
}
