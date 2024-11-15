import { DIV, H1 } from "@fartlabs/htx";
import { renderStyle as css } from "@fartlabs/htx/render";
import type { Profile } from "#/lib/profile.ts";
import { Layout } from "#/components/layout.tsx";

export interface ProfilePageProps {
  profile: Profile;
}

export function ProfilePage(props: ProfilePageProps) {
  return (
    <Layout>
      <DIV
        style={css({
          "align-items": "center",
          display: "flex",
          "justify-content": "center",
          height: "100%",
        })}
      >
        <H1>{props.profile.title}</H1>
      </DIV>
    </Layout>
  );
}
