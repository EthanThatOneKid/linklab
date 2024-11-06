import { BODY, HTML } from "@fartlabs/htx";

export function Layout(props: { children?: string[] }) {
  return (
    <HTML>
      <BODY>{(props.children ?? []).join("")}</BODY>
    </HTML>
  );
}
