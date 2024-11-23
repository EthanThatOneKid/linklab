import {
  A,
  BODY,
  H1,
  HEAD,
  HTML,
  IMG,
  LI,
  LINK,
  MAIN,
  META,
  P,
  STYLE,
  TITLE,
  UL,
} from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import type { Profile } from "#/lib/profile.ts";

export interface ProfilePageProps {
  profile: Profile;
}

export function ProfilePage(props: ProfilePageProps) {
  const title = props.profile.title ?? `@${props.profile.id}`;
  const iconHref = props.profile.iconURL ?? "https://fartlabs.org/fl-logo.png";

  return (
    <HTML>
      <HEAD>
        <META charset="utf-8" />
        <META name="viewport" content="width=device-width, initial-scale=1" />
        <LINK rel="icon" href={iconHref} />
        <TITLE>{title}</TITLE>
        {props.profile.description !== undefined
          ? (
            <META
              name="description"
              content={props.profile.description}
            />
          )
          : ""}

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
      </HEAD>

      <BODY>
        <MAIN class="fart-section">
          {props.profile.iconURL
            ? <IMG src={props.profile.iconURL} alt="Profile icon" />
            : ""}
          <H1>{title}</H1>

          {props.profile.description !== undefined
            ? <P>{props.profile.description}</P>
            : ""}

          {props.profile.links.length === 0
            ? <P>Add links to your portfolio.</P>
            : (
              <UL>
                {props.profile.links.map((link) => (
                  <LI style={renderStyle({ "margin-bottom": "1rem" })}>
                    {link.iconURL
                      ? (
                        <IMG
                          src={link.iconURL}
                          alt="Link icon"
                          width="24"
                          height="24"
                        />
                      )
                      : ""}
                    <A href={link.url}>{link.title}</A>
                  </LI>
                ))}
              </UL>
            )}
        </MAIN>
      </BODY>
    </HTML>
  );
}
