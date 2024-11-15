import { A, DIV, H1, NAV, P, SECTION, SPAN } from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { SignInForm } from "#/components/signin-form.tsx";
import { SignOutForm } from "#/components/signout-form.tsx";
import { ClaimForm } from "#/components/claim-form.tsx";

export interface LandingPageProps {
  user?: User;
}

export function LandingPage(props: LandingPageProps) {
  return (
    <Layout>
      <SECTION class="fart-section">
        <NAV>
          <H1 id="top" class="fart-header">Linklab</H1>

          {props.user === undefined ? <SignInForm /> : (
            <DIV>
              <A href="/profile">{props.user.githubLogin}</A> <SignOutForm />
            </DIV>
          )}
        </NAV>

        <P>
          Join everybody using <SPAN class="fart-sparkle">Linklab</SPAN>{" "}
          for their link in bio. One link to help you share everything you
          create, curate and sell from your Instagram, TikTok, Twitter, YouTube
          and other social media profiles.
        </P>

        <ClaimForm />
      </SECTION>
    </Layout>
  );
}
