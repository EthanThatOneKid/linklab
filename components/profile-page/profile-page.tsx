import { BR, SECTION } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { ProfileEditor } from "./profile-editor.tsx";
import { Navbar } from "#/components/navbar.tsx";

export interface ProfileEditPageProps {
  user: User;
  profile: Profile;
  owner: User;
}

export function ProfileEditPage(props: ProfileEditPageProps) {
  return (
    <Layout>
      <Navbar user={props.user} />

      <SECTION class="fart-section">
        <ProfileEditor value={props.profile} />

        <BR />
        {/* TODO: Add a link to the profile page. */}
        {/* TODO: Link to user page of owner */}
      </SECTION>
    </Layout>
  );
}
