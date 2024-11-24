import { Asset, Assets } from "@fartlabs/jsonx/std/assets";
import type { Profile } from "#/lib/profile.ts";
import { ProfilePage } from "#/components/profile-page.tsx";

export interface ProjectAssetsProps {
  profile: Profile;
}

export function ProjectAssets(props: ProjectAssetsProps) {
  return (
    <Assets>
      <Asset
        path="./main.ts"
        content={`import { serveDir } from "jsr:@std/http/file-server";

if (import.meta.main) {
  Deno.serve((request) => serveDir(request));
}
`}
      />
      <Asset
        path="./index.html"
        content={<ProfilePage profile={props.profile} />}
      />
      <Asset
        path="./profile.json"
        content={JSON.stringify(props.profile)}
      />
    </Assets>
  );
}
