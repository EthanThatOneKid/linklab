import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { ProfilePage } from "#/components/profile-page.tsx";

export function makeProfilePreviewPageHandler(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Handler {
  return async function handler(request, _info, params) {
    const sessionID = await getSessionId(request);
    if (sessionID === undefined) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await getUserBySessionID(kv, sessionID);
    if (user.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    const profileID = params?.pathname?.groups?.id;
    if (profileID === undefined) {
      return new Response("Not found", { status: 404 });
    }

    const profile = await getProfileByProfileID(kv, profileID);
    if (profile.value === null) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(
      <ProfilePage profile={profile.value} />,
      { headers: new Headers({ "Content-Type": "text/html" }) },
    );
  };
}
