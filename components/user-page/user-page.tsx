import { H1, SECTION } from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";

export interface UserPageProps {
  user: User;
  pageOwner: User;
}

export function UserPage(props: UserPageProps) {
  return (
    <Layout>
      <SECTION class="fart-section">
        <Navbar user={props.user} />

        <H1>{props.pageOwner.githubLogin}</H1>
      </SECTION>
    </Layout>
  );
}
