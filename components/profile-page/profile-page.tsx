import { H3, P, SECTION } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { makeSettingsTabs } from "#/lib/settings-tabs.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
import { SettingsLayout } from "./settings-layout.tsx";
import { ProfileForm } from "./profile-form.tsx";
import { ProfileFormDangerZoneForm } from "./profile-form-danger-zone.tsx";

export interface ProfileGeneralSettingsPageProps {
  user: User;
  profile: Profile;
  owner: User;
}

export function ProfileGeneralSettingsPage(
  props: ProfileGeneralSettingsPageProps,
) {
  return (
    <Layout>
      <Navbar user={props.user} />

      <SECTION class="fart-section">
        <SettingsLayout
          profile={props.profile}
          tabs={makeSettingsTabs("general", props.profile.id)}
        >
          <H3>General settings</H3>
          <P>
            This form contains metadata of the profile in question. Click the
            update button to confirm changes.
          </P>
          <ProfileForm value={props.profile} />

          <H3>Danger zone</H3>
          <ProfileFormDangerZoneForm value={props.profile} />
        </SettingsLayout>
      </SECTION>
    </Layout>
  );
}
