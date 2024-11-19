import { A, BR, H1, H2, LI, P, SECTION, UL } from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import type { Profile } from "#/lib/profile.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
import { ClaimProfileForm } from "#/components/claim-profile-form.tsx";
import { makeProfileURL } from "#/lib/urls.ts";

export interface UserPageProps {
  user: User;
  pageOwner: User;
  profiles: Profile[];
}

export function UserPage(props: UserPageProps) {
  const isPageOwner = props.user.githubID === props.pageOwner.githubID;
  return (
    <Layout>
      <SECTION class="fart-section">
        <Navbar user={props.user} />
        <H1>@{props.pageOwner.githubLogin}</H1>
        <H2>{isPageOwner ? "Your" : "Their"} profiles</H2>

        {props.profiles.length === 0 ? <P>No profiles yet.</P> : (
          <UL>
            {props.profiles.map((profile) => (
              <LI>
                <A href={makeProfileURL(profile.id)}>
                  {`@${profile.id}${profile.title ? `: ${profile.title}` : ""}`}
                </A>
              </LI>
            ))}
          </UL>
        )}
        <BR />
        {isPageOwner ? <ClaimProfileForm /> : ""}
      </SECTION>
    </Layout>
  );
}
