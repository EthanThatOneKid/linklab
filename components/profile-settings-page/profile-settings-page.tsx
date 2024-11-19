import { DIV, EM, H2, H3, LI, P, SECTION, UL } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
import { Tabs } from "#/components/tabs.tsx";
import { ProfileMetadataForm } from "./profile-metadata-form.tsx";
import { ProfileDangerZoneForm } from "./profile-danger-zone-form.tsx";
import { ProfileLinkForm } from "./profile-link-form.tsx";
import { ProfileLinkAddForm } from "./profile-link-add-form.tsx";
import { ProfileLinkMoveForm } from "./profile-link-move-form.tsx";

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
        <H2>Profile settings: @{props.profile.id}</H2>
        <Tabs
          tabs={[
            {
              id: "general",
              title: "General settings",
              content: (
                <DIV>
                  <H3>General settings</H3>
                  <P>
                    This form contains metadata of the profile in question.
                    Click the update button to confirm changes.
                  </P>
                  <ProfileMetadataForm value={props.profile} />

                  <H3>Danger zone</H3>
                  <P>
                    This form contains the delete button for the profile in
                    question. Click the delete button to confirm deletion.
                    Proceed with caution.
                  </P>
                  <ProfileDangerZoneForm value={props.profile} />
                </DIV>
              ),
            },
            {
              id: "links",
              title: "Links settings",
              content: (
                <DIV>
                  <H3>Links settings</H3>
                  <P>
                    This form contains links of the profile in question. Click
                    the update button to confirm changes.
                  </P>

                  {props.profile.links === undefined ||
                      props.profile.links.length === 0
                    ? (
                      <P>
                        <EM>No links yet.</EM>
                      </P>
                    )
                    : (
                      <UL>
                        {props.profile?.links?.map((link, i) => (
                          <LI>
                            <ProfileLinkForm
                              value={link}
                              index={i}
                              parentID={props.profile.id}
                            />
                          </LI>
                        ))}
                      </UL>
                    )}

                  <H3>Move link</H3>
                  <ProfileLinkMoveForm parentID={props.profile.id} />

                  <H3>Add link</H3>
                  <ProfileLinkAddForm parentID={props.profile.id} />
                </DIV>
              ),
            },
          ]}
        />
      </SECTION>
    </Layout>
  );
}
