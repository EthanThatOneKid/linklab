import { Asset, Assets } from "@fartlabs/jsonx/std/assets";
import type { Profile } from "#/lib/profile.ts";

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
      {/* TODO: Replace content with profile page component. */}
      <Asset
        path="./index.html"
        content={`<h1>Hello, @${props.profile.id}!</h1>`}
      />
    </Assets>
  );
}
