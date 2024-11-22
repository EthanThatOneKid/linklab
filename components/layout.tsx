import {
  A,
  BODY,
  BR,
  FOOTER,
  HEAD,
  HR,
  HTML,
  LINK,
  META,
  P,
  SMALL,
  TITLE,
} from "@fartlabs/htx";

export interface LayoutProps {
  title?: string;
  description?: string;
  head?: string;
  useCssLibs?: boolean;
  children?: string[];
}

const defaultPageTitle = "Linklab";
const defaultPageDescription = "Your link-in-bio page.";

export function Layout(props: LayoutProps) {
  return (
    <HTML>
      <HEAD>
        <META charset="utf-8" />
        <META name="viewport" content="width=device-width, initial-scale=1" />
        <LINK rel="icon" href="https://fartlabs.org/fl-logo.png" />
        <TITLE>{props.title ?? defaultPageTitle}</TITLE>
        <META
          name="description"
          content={props.description ?? defaultPageDescription}
        />
        {props.useCssLibs ?? true
          ? <LINK rel="stylesheet" href="https://css.fart.tools/fart.css" /> + (
            <LINK rel="stylesheet" href="/static/linklab.css" />
          )
          : ""}

        {props.head ?? ""}
      </HEAD>

      <BODY>
        {(props.children ?? []).join("")}
        <Footer />
      </BODY>
    </HTML>
  );
}

function Footer() {
  return (
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
        </A>{" "}
        <A
          class="fart-button"
          href="https://github.com/FartLabs"
          target="_blank"
        >
          GitHub<SMALL>↗</SMALL>
        </A>{" "}
        <A
          class="fart-button"
          href="https://go.fart.tools/chat"
          target="_blank"
        >
          Chat<SMALL>↗</SMALL>
        </A>
      </P>
    </FOOTER>
  );
}
