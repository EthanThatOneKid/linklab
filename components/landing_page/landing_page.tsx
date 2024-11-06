import { BUTTON, FORM, H1, H2, SECTION } from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";

export interface LandingPageProps {
  user?: User;
}

export function LandingPage() {
  // TODO: Pass user properties to landing page.
  // E.g. Render anchor tag to profile page on navbar if user is signed in.
  //

  return (
    <Layout>
      <H1>Linklab</H1>

      <SECTION>
        <H2>Sign up/Log in</H2>

        <FORM action="/signin?success_url=/profile">
          <BUTTON type="submit">Sign in with GitHub</BUTTON>
        </FORM>
      </SECTION>
    </Layout>
  );
}
