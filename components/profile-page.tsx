import { A, H1, IMG, LI, P, STYLE, UL } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import { Layout } from "#/components/layout.tsx";
import { renderStyle } from "@fartlabs/htx/render";

export interface ProfilePageProps {
  profile: Profile;
}

export function ProfilePage(props: ProfilePageProps) {
  const presentationTitle = props.profile.title ?? `@${props.profile.id}`;
  return (
    <Layout
      title={presentationTitle}
      description={props.profile.description}
      useCssLibs={false}
      head={
        <STYLE>
          {`body {${
            renderStyle({
              "font-family": "Arial, sans-serif",
              "color": props.profile.colorStyle ?? "#333",
              "margin": "0",
              "padding": "0",
              "background": props.profile.backgroundStyle ?? "#f8f8f8",
              "font-size": "16px",
              "line-height": "1.5",
            })
          }}`}
        </STYLE>
      }
    >
      <IMG src={props.profile.iconURL} alt="Profile icon" />
      <H1>presentationTitle</H1>

      {props.profile.description !== undefined
        ? <P>{props.profile.description}</P>
        : ""}

      {props.profile.links.length === 0
        ? <P>Add links to your portfolio.</P>
        : (
          <UL style={renderStyle({ "list-style-type": "none" })}>
            {props.profile.links.map((link) => (
              <LI style={renderStyle({ "margin-bottom": "1rem" })}>
                {link.iconURL !== undefined
                  ? <IMG src={link.iconURL} alt="Link icon" />
                  : ""}
                <A href={link.url}>{link.title}</A>
              </LI>
            ))}
          </UL>
        )}
    </Layout>
  );
}
