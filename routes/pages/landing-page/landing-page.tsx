import { P, SECTION, SPAN } from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import { Layout } from "#/components/layout.tsx";
import { Navbar } from "#/components/navbar.tsx";
import { ClaimProfileForm } from "#/components/claim-profile-form.tsx";

export interface LandingPageProps {
  user?: User;
}

export function LandingPage(props: LandingPageProps) {
  return (
    <Layout>
      <SECTION class="fart-section">
        <Navbar user={props.user} />

        <P>
          Join everybody using <SPAN class="fart-sparkle">Linklab</SPAN>{" "}
          for their link in bio. One link to help you share everything you
          create, curate and sell from your Instagram, TikTok, Twitter, YouTube
          and other social media profiles.
        </P>

        <ClaimProfileForm />
      </SECTION>
    </Layout>
  );
}
