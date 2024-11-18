import { BR, H2, SECTION } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
// import { ProfileEditor } from "./profile-editor.tsx";
import { Tabs } from "#/components/tabs.tsx";

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
        <H2>Edit profile</H2>
        <Tabs
          tabs={[
            {
              id: "general",
              title: "General",
              content: "General content",
            },
            {
              id: "links",
              title: "Links",
              content: "Links content",
            },
          ]}
        />
        {/* <ProfileEditor value={props.profile} /> */}
      </SECTION>

      <BR />
      {/* TODO: Add a link to the profile page. */}
      {/* TODO: Link to user page of owner */}
    </Layout>
  );
}
