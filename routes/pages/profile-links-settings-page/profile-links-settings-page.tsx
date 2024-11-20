import { DIV, H3, P, SECTION } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { makeSettingsTabs } from "#/lib/settings-tabs.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
import { SettingsLayout } from "#/components/settings-layout.tsx";
import { LinkFormAdd } from "./link-form-add.tsx";
import { LinksManager } from "#/routes/pages/profile-links-settings-page/links-manager.tsx";

export interface LinksPageProps {
  profile: Profile;
  owner: User;
  user: User;
}

export function ProfileLinksSettingsPage(props: LinksPageProps) {
  return (
    <Layout>
      <Navbar user={props.user} />

      <SECTION class="fart-section">
        <SettingsLayout
          profile={props.profile}
          owner={props.user}
          tabs={makeSettingsTabs("links", props.profile.id)}
        >
          <DIV>
            <H3>Manage links</H3>
            <P>
              Manage your profile's links. You can add, move, and remove links
              here.
            </P>
            <LinksManager profile={props.profile} />

            <H3>Add link</H3>
            <LinkFormAdd parentID={props.profile.id} />
          </DIV>
        </SettingsLayout>
      </SECTION>
    </Layout>
  );
}
