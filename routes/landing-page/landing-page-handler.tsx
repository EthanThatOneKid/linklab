import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getUserBySessionID } from "#/lib/kv-linklab.ts";
import { LandingPage } from "./landing-page.tsx";

export function makeLandingPageHandler(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Handler {
  return async function handler(request) {
    const sessionID = await getSessionId(request);
    if (sessionID === undefined) {
      return new Response(
        <LandingPage />,
        { headers: new Headers({ "Content-Type": "text/html" }) },
      );
    }

    const user = await getUserBySessionID(kv, sessionID);
    if (user.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    return new Response(
      <LandingPage user={user.value} />,
      { headers: new Headers({ "Content-Type": "text/html" }) },
    );
  };
}
