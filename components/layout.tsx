import { BODY, HTML, LINK, META } from "@fartlabs/htx";

export function Layout(props: { children?: string[] }) {
  return (
    <HTML>
      <META charset="utf-8" />
      <LINK rel="stylesheet" href="https://css.fart.tools/fart.css" />
      <BODY>
        {(props.children ?? []).join("")}
      </BODY>
    </HTML>
  );
}
