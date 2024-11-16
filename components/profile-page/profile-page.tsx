import { CODE, DIV, H1, PRE } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import type { Profile } from "#/lib/profile.ts";
import { Layout } from "#/components/layout.tsx";

export interface ProfilePageProps {
  profile: Profile;
}

export function ProfilePage(props: ProfilePageProps) {
  return (
    <Layout>
      <DIV
        style={renderStyle({
          "align-items": "center",
          display: "flex",
          "justify-content": "center",
          height: "100%",
        })}
      >
        <H1>{props.profile.title}</H1>

        <PRE>
          <CODE>{JSON.stringify(props.profile, null, 2)}</CODE>
        </PRE>
      </DIV>
    </Layout>
  );
}
