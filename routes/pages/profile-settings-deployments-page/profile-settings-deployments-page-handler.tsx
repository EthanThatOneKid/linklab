import type { Handler } from "@std/http";
import type { Helpers } from "@deno/kv-oauth";
import { getProfileByProfileID } from "#/lib/kv/get-profile-by-profile-id.ts";
import { getUserByGitHubUserID } from "#/lib/kv/get-user-by-github-user-id.ts";
import { getUserBySessionID } from "#/lib/kv/get-user-by-session-id.ts";
import { ProfileSettingsDeploymentsPage } from "./profile-settings-deployments-page.tsx";
import { subhosting } from "#/lib/subhosting.ts";
import { getProjectByProfileID } from "#/lib/kv/get-project-by-profile-id.ts";

export function makeProfileSettingDeploymentsPageHandler(
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

    const owner = await getUserByGitHubUserID(
      kv,
      profile.value.ownerGitHubUserID,
    );
    if (owner.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    const project = await getProjectByProfileID(kv, profileID);
    if (project.value === null) {
      return new Response("Internal server error", { status: 500 });
    }

    const deployments = await subhosting.projects.deployments.list(
      project.value.id,
      { order: "desc" },
    );
    return new Response(
      <ProfileSettingsDeploymentsPage
        user={user.value}
        profile={profile.value}
        owner={owner.value}
        deployments={deployments}
      />,
      { headers: new Headers({ "Content-Type": "text/html" }) },
    );
  };
}
