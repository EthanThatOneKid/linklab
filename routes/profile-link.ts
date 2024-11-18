import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import type { ProfileLink } from "#/lib/profile.ts";
import {
  getProfileByProfileID,
  getUserBySessionID,
  setProfileByID,
} from "#/lib/kv-linklab.ts";

export function makeProfileLinkHandler(
  kv: Deno.Kv,
  { getSessionId }: Helpers,
): Handler {
  return async function handler(request, _info, params) {
    // Check if user is signed in.
    const sessionID = await getSessionId(request);
    if (sessionID === undefined) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the user from the session ID.
    const user = await getUserBySessionID(kv, sessionID);
    if (user.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    // Get the profile ID from the request.
    const profileID = params?.pathname?.groups?.id;
    if (profileID === undefined) {
      return new Response("Not found", { status: 404 });
    }

    // Get the profile from the profile ID.
    const profile = await getProfileByProfileID(kv, profileID);
    if (profile.value === null) {
      return new Response("Not found", { status: 404 });
    }

    // Get the link index from the request.
    const index = params?.pathname?.groups?.index;
    if (index === undefined) {
      return new Response("Bad request", { status: 400 });
    }

    const indexNumber = parseInt(index, 10);
    if (isNaN(indexNumber)) {
      return new Response("Bad request", { status: 400 });
    }

    // Parse the link data from the request.
    const profileLink = parseProfileLinkFromRequest(request);
    if (profileLink === null) {
      return new Response("Bad request", { status: 400 });
    }

    // Update the profile link.
    const profileLinks = profile.value.links ?? [];
    profileLinks[indexNumber] = profileLink;
    const result = await setProfileByID(kv, {
      ...profile.value,
      links: profileLinks,
    });
    if (!result.ok) {
      return new Response("Internal server error", { status: 500 });
    }

    return new Response(null, {
      status: 303,
      headers: new Headers({ Location: `/${profile.value.id}` }),
    });
  };
}

function parseProfileLinkFromRequest(request: Request): ProfileLink {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (url === null) {
    throw new Error("Missing URL");
  }

  const title = searchParams.get("title");
  if (title === null) {
    throw new Error("Missing title");
  }

  const iconURL = searchParams.get("iconURL");
  if (iconURL === null) {
    throw new Error("Missing icon URL");
  }

  return { url, title, iconURL };
}
