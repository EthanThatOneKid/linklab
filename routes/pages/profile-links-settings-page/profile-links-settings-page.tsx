import { DIV, EM, H3, H4, LI, P, SECTION, UL } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { makeSettingsTabs } from "#/lib/settings-tabs.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
import { SettingsLayout } from "#/components/settings-layout.tsx";
import { LinkForm } from "./link-form.tsx";
import { LinkFormAdd } from "./link-form-add.tsx";
import { LinkFormMove } from "./link-form-move.tsx";

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

            {props.profile.links === undefined ||
                props.profile.links.length === 0
              ? (
                <P>
                  <EM>No links yet.</EM>
                </P>
              )
              : (
                <UL
                  style={renderStyle({
                    "list-style-type": "none",
                    padding: "0",
                    margin: "0",
                  })}
                >
                  {props.profile?.links?.map((link, i) => (
                    <LI
                      style={renderStyle({
                        "background-color": "var(--fart-lighter-dark-green)",
                        "border-radius": "1em",
                        padding: "1em 0",
                      })}
                    >
                      <H4 style={renderStyle({ margin: "0 20px" })}>
                        Link {i + 1}
                      </H4>
                      <LinkForm
                        value={link}
                        index={i}
                        parentID={props.profile.id}
                      />
                    </LI>
                  ))}
                </UL>
              )}

            <H3>Move link</H3>
            <LinkFormMove parentID={props.profile.id} />

            <H3>Add link</H3>
            <LinkFormAdd parentID={props.profile.id} />
          </DIV>
        </SettingsLayout>
      </SECTION>
    </Layout>
  );
}
