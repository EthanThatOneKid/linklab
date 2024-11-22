import { A, DIV, H3, LI, P, SECTION, STRONG, UL } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import type { Deployment } from "subhosting/resources/shared";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import { makeSettingsTabs } from "#/lib/settings-tabs.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
import { SettingsLayout } from "#/components/settings-layout.tsx";

export interface ProfileSettingsDeploymentsPageProps {
  profile: Profile;
  owner: User;
  user: User;
  deployments: Deployment[];
}

export function ProfileSettingsDeploymentsPage(
  props: ProfileSettingsDeploymentsPageProps,
) {
  return (
    <Layout>
      <Navbar user={props.user} />

      <SECTION class="fart-section">
        <SettingsLayout
          profile={props.profile}
          owner={props.user}
          tabs={makeSettingsTabs("deployments", props.profile.id)}
        >
          <DIV>
            <H3>Deployments</H3>
            <P>
              Manage your profile's deployments. Deployments are a way to
              showcase your projects.
            </P>

            {props.deployments.length === 0
              ? <P>No deployments yet.</P>
              : (
                <UL style={renderStyle({ "list-style-type": "none" })}>
                  {props.deployments.map((deployment) => (
                    <LI
                      style={renderStyle({
                        display: "flex",
                        "align-items": "center",
                        "margin-bottom": "1rem",
                      })}
                    >
                      <DIV>
                        <P>
                          <A href={`https://${deployment.domains?.at(0)}`}>
                            <STRONG>{deployment.id}</STRONG>
                          </A>
                        </P>
                      </DIV>
                    </LI>
                  ))}
                </UL>
              )}
          </DIV>
        </SettingsLayout>
      </SECTION>
    </Layout>
  );
}
