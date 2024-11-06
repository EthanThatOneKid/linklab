import type { Route } from "@std/http";
import { route } from "@std/http";
import {
  BODY,
  BUTTON,
  FORM,
  H1,
  H2,
  HTML,
  INPUT,
  LABEL,
  SECTION,
} from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import { githubOAuthHelpers, kv, makeKvOAuthRoutes } from "#/lib/kv-oauth.ts";
import { makeLinklabRoutes } from "#/lib/linklab-kv.ts";

// Linklab is a Linktree clone.
//
// Required pages:
// - Landing page
// - Profile page
// - Profile edit page
// - Profile delete page
// - Profile list page
//

const fakeProfile: Profile = {
  id: "abc123",
  title: "EthanThatOneKid",
  owner: {
    githubID: "123",
    githubLogin: "EthanThatOneKid",
  },
  links: [
    {
      title: "Homepage",
      url: "https://etok.me/",
    },
    {
      title: "GitHub",
      url: "https://github.com/EthanThatOneKid",
    },
  ],
};

export const routes: Route[] = [
  ...makeKvOAuthRoutes(githubOAuthHelpers),
  ...makeLinklabRoutes(githubOAuthHelpers, kv),
  {
    pattern: new URLPattern({ pathname: "/" }),
    async handler(request) {
      // Check if user is signed in.
      const sessionID = await githubOAuthHelpers.getSessionId(request);
      return new Response(
        sessionID !== undefined ? "You are signed in" : <LandingPage />,
        {
          headers: new Headers({
            "Content-Type": "text/html",
          }),
        },
      );
    },
  },
  {
    pattern: new URLPattern({ pathname: "/profile" }),
    handler(_request) {
      // const sessionID = await githubOAuthHelpers.getSessionId(request);
      // const user = await getGitHubUser(sessionID);
      return new Response(
        <ProfileEditPage profile={fakeProfile} />,
        {
          headers: new Headers({
            "Content-Type": "text/html",
          }),
        },
      );
    },
  },
];

export function defaultHandler(_request: Request) {
  return new Response(
    "Not found",
    { status: 404 },
  );
}

export const router = route(routes, defaultHandler);

if (import.meta.main) {
  Deno.serve((request) => router(request));
}

function LandingPage() {
  // TODO: Pass user properties to landing page.
  // E.g. Render anchor tag to profile page if user is signed in.
  //

  return (
    <HTML>
      <BODY>
        <H1>Linklab</H1>

        <SECTION>
          <H2>Sign up/Log in</H2>

          <FORM action="/signin?success_url=/profile">
            <BUTTON type="submit">Sign in with GitHub</BUTTON>
          </FORM>
        </SECTION>
      </BODY>
    </HTML>
  );
}

function ProfileEditPage(props: { profile?: Profile }) {
  return (
    <HTML>
      <BODY>
        <H1>Edit Profile</H1>

        <FORM action="/profile" method="POST">
          <SECTION>
            <LABEL for="title">Title</LABEL>
            <INPUT id="title" name="title" value={props.profile?.title} />
          </SECTION>

          <SECTION>
            <H2>Links</H2>

            {(props.profile?.links ?? []).map((link, index) => (
              <SECTION>
                <LABEL for={`link-title-${index}`}>Title</LABEL>
                <INPUT
                  id={`link-title-${index}`}
                  name={`link-title-${index}`}
                  value={link.title}
                />

                <LABEL for={`link-url-${index}`}>URL</LABEL>
                <INPUT
                  id={`link-url-${index}`}
                  name={`link-url-${index}`}
                  value={link.url}
                />
              </SECTION>
            )).join("")}
          </SECTION>

          <BUTTON type="button">Add Link</BUTTON>

          <BUTTON type="submit">Save</BUTTON>
        </FORM>
      </BODY>
    </HTML>
  );
}

// kv oauth docs: https://jsr.io/@deno/kv-oauth
//
