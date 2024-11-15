import {
  A,
  BUTTON,
  DIV,
  FORM,
  H1,
  INPUT,
  NAV,
  P,
  SECTION,
  SPAN,
} from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
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

function SignInForm() {
  return <A href="/signin" class="fart-button">Sign in with GitHub</A>;
}

function SignOutForm() {
  return <A href="/signout" class="fart-button">Sign out</A>;
}

function ClaimForm() {
  return (
    <FORM
      class="claim-form"
      // action="/claim"
      style={renderStyle({
        display: "flex",
        "flex-direction": "row",
        gap: "1rem",
        "max-width": "400px",
      })}
    >
      <INPUT
        type="text"
        name="username"
        style={renderStyle({
          flex: "1",
          padding: "0.75rem",
          border: "none",
          "border-radius": "0.25rem",
          "background-color": "rgba(255, 255, 255, 0.1)",
          color: "white",
        })}
      />
      <BUTTON
        type="submit"
        style={renderStyle({
          padding: "0.75rem",
          border: "none",
          "border-radius": "0.25rem",
          "background-color": "#c2f732",
          color: "#0f2f21",
          cursor: "pointer",
          "font-weight": "bold",
        })}
        onclick="(e) => { e.preventDefault(); alert('Feature coming soon!'); }"
      >
        Claim your Linklab
      </BUTTON>
    </FORM>
  );
}
