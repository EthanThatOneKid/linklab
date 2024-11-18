import { BR, DIV, H1 } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import type { Profile } from "#/lib/profile.ts";
import { Layout } from "#/components/layout.tsx";
import { ProfileEditor } from "./profile-editor.tsx";

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
        <BR />
        <ProfileEditor value={props.profile} />
      </DIV>
    </Layout>
  );
}
