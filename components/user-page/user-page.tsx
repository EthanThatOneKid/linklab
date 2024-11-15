import { A, H1, H2, LI, P, SECTION, UL } from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import type { Profile } from "#/lib/profile.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";

export interface UserPageProps {
  user: User;
  pageOwner: User;
  profiles: Profile[];
}

export function UserPage(props: UserPageProps) {
  return (
    <Layout>
      <SECTION class="fart-section">
        <Navbar user={props.user} />
        <H1>{props.pageOwner.githubLogin}</H1>
        <H2>Your profiles</H2>

        {props.profiles.length === 0
          ? <P>You don't have any profiles yet.</P>
          : (
            <UL>
              {props.profiles.map((profile) => (
                <LI>
                  <A href={`/${profile.id}`}>{profile.title}</A>
                </LI>
              ))}
            </UL>
          )}
      </SECTION>
    </Layout>
  );
}
