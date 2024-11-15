import {
  A,
  BODY,
  BR,
  FOOTER,
  HR,
  HTML,
  LINK,
  META,
  P,
  SMALL,
} from "@fartlabs/htx";

export function Layout(props: { children?: string[] }) {
  return (
    <HTML>
      <META charset="utf-8" />
      <LINK rel="stylesheet" href="https://css.fart.tools/fart.css" />
      <BODY>
        {(props.children ?? []).join("")}

        <FOOTER class="fart-section">
          <HR />
          <P>
            © FartLabs <A class="fart-logo" href="https://fartlabs.org">🧪</A>
            <BR />
            <A
              class="fart-button"
              href="https://fartlabs.org/blog"
              target="_blank"
            >
              Blog<SMALL>↗</SMALL>
            </A>
            <A
              class="fart-button"
              href="https://github.com/FartLabs"
              target="_blank"
            >
              GitHub<SMALL>↗</SMALL>
            </A>
            <A
              class="fart-button"
              href="https://go.fart.tools/chat"
              target="_blank"
            >
              Chat<SMALL>↗</SMALL>
            </A>
          </P>
        </FOOTER>
      </BODY>
    </HTML>
  );
}
