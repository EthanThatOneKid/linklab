import {
  A,
  CODE,
  DIV,
  H3,
  LI,
  P,
  SECTION,
  SMALL,
  TIME,
  UL,
} from "@fartlabs/htx";
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

            {props.deployments.length === 0 ? <P>No deployments yet.</P> : (
              <UL
                style={renderStyle({ "padding-left": "0" })}
              >
                {props.deployments.map((deployment) => {
                  const domain = deployment.domains?.at(0);
                  const previewURL = `https://${domain}`;
                  return (
                    <LI
                      style={renderStyle({
                        display: "flex",
                        "align-items": "center",
                        "margin-bottom": "1rem",
                      })}
                    >
                      <DIV>
                        <A href={previewURL}>
                          <CODE>{deployment.id}</CODE>
                        </A>{" "}
                        <SMALL>
                          <TIME datetime={deployment.createdAt}>
                            {new Date(deployment.createdAt).toLocaleString()}
                          </TIME>
                        </SMALL>
                      </DIV>
                    </LI>
                  );
                })}
              </UL>
            )}
          </DIV>
        </SettingsLayout>
      </SECTION>
    </Layout>
  );
}
