import { BR, H1, SECTION } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { ProfileEditor } from "./profile-editor.tsx";

export interface ProfilePageProps {
  profile: Profile;
  owner: User;
}

export function ProfilePage(props: ProfilePageProps) {
  return (
    <Layout>
      <SECTION class="fart-section">
        <H1>{props.profile.title ?? `@${props.profile.id}`}</H1>
        <BR />
        <ProfileEditor value={props.profile} />
      </SECTION>
    </Layout>
  );
}
