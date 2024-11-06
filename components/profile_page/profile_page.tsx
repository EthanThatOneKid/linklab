import { DIV, H1 } from "@fartlabs/htx";
import { renderStyle as css } from "@fartlabs/htx/render";
import { Layout } from "#/components/layout.tsx";
import { Profile } from "#/lib/profile.ts";

export function ProfilePage(props: { profile: Profile }) {
  return (
    <Layout>
      <DIV
        style={css({
          "align-items": "center",
          display: "flex",
          "justify-content": "center",
          height: "100%",
        })}
      >
        <H1>{props.profile.title}</H1>
      </DIV>
    </Layout>
  );
}
