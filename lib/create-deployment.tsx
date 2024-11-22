import { subhosting } from "./subhosting.ts";
import type { Profile } from "./profile.ts";
import { ProjectAssets } from "./project-assets.tsx";

export async function createDeployment(projectID: string, profile: Profile) {
  const { assets } = <ProjectAssets profile={profile} />;
  await subhosting.projects.deployments.create(
    projectID,
    {
      entryPointUrl: "./main.ts",
      envVars: {},
      assets,
    },
  );
}