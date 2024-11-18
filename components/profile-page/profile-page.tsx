import { BR, SECTION } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { ProfileEditor } from "./profile-editor.tsx";

export interface ProfileEditPageProps {
  profile: Profile;
  owner: User;
}

export function ProfileEditPage(props: ProfileEditPageProps) {
  return (
    <Layout>
      <SECTION class="fart-section">
        <ProfileEditor value={props.profile} />

        <BR />
        {/* TODO: Add a link to the profile page. */}
        {/* TODO: Link to user page of owner */}
      </SECTION>
    </Layout>
  );
}
