import {
  A,
  BUTTON,
  DIV,
  FORM,
  H1,
  H2,
  INPUT,
  NAV,
  P,
  SECTION,
  SMALL,
  SPAN,
} from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";

export interface LandingPageProps {
  user?: User;
}

export function LandingPage(props: LandingPageProps) {
  return (
    <Layout>
      <SECTION class="fart-section">
        <NAV>
          <H1 id="top" class="fart-header">Linklab</H1>
          <A
            class="fart-button"
            href="https://github.com/FartLabs/linklab"
            target="_blank"
          >
            &bigstar;Source<SMALL>↗</SMALL>
          </A>
        </NAV>

        <P>
          Join everybody using <SPAN class="fart-sparkle">Linklab</SPAN>{" "}
          for their link in bio. One link to help you share everything you
          create, curate and sell from your Instagram, TikTok, Twitter, YouTube
          and other social media profiles.
        </P>

        {props.user === undefined
          ? (
            <DIV>
              <H2>Sign in</H2>
              <SignInForm />
            </DIV>
          )
          : (
            <DIV>
              <H2>{props.user.githubLogin}, you are signed in.</H2>
            </DIV>
          )}

        <ClaimForm />
      </SECTION>
    </Layout>
  );
}

function SignInForm() {
  return (
    <FORM action="/signin">
      <BUTTON type="submit">Sign in with GitHub</BUTTON>
    </FORM>
  );
}

function ClaimForm() {
  return (
    <FORM class="claim-form" action="/claim">
      <INPUT type="text" name="username" placeholder="unique-id" />
      <BUTTON type="submit">Claim your Linklab</BUTTON>
    </FORM>
  );
}
