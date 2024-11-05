import { BODY, H1, HTML } from "@fartlabs/htx";

// Linklab is a Linktree clone.
//
// Required pages:
// - Landing page
// - Profile page
// - Profile edit page
// - Profile delete page
// - Profile list page

if (import.meta.main) {
  Deno.serve(() => {
    return new Response(
      <HTML>
        <BODY>
          <H1>Linklab</H1>
        </BODY>
      </HTML>,
      {
        headers: new Headers({
          "Content-Type": "text/html",
        }),
      },
    );
  });
}
