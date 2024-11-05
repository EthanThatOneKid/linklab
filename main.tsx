import { BODY, H1, HTML } from "@fartlabs/htx";
// import { Profile } from "./lib/profile.ts";

// Linklab is a Linktree clone.
//
// Required pages:
// - Landing page
// - Profile page
// - Profile edit page
// - Profile delete page
// - Profile list page
//

if (import.meta.main) {
  Deno.serve(() => {
    return new Response(
      <LandingPage />,
      {
        headers: new Headers({
          "Content-Type": "text/html",
        }),
      },
    );
  });
}

function LandingPage() {
  return (
    <HTML>
      <BODY>
        <H1>Linklab</H1>
      </BODY>
    </HTML>
  );
}

// function ProfileEditPage(props: { profile?: Profile }) {
//   return (
//     <HTML>
//       <BODY>
//         <H1>Edit Profile</H1>
//
//         <FORM></FORM>
//       </BODY>
//     </HTML>
//   );
// }
