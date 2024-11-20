import { EM, H4, LI, P, SECTION, UL } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import type { Profile } from "#/lib/profile.ts";
import { LinkForm, renderLinkString } from "./link-form.tsx";

export interface LinksManagerProps {
  profile: Profile;
}

export function LinksManager(props: LinksManagerProps) {
  return (
    <SECTION>
      {props.profile.links === undefined ||
          props.profile.links.length === 0
        ? (
          <P>
            <EM>No links yet.</EM>
          </P>
        )
        : (
          <UL
            style={renderStyle({
              "list-style-type": "none",
              padding: "0",
              margin: "0",
            })}
          >
            {props.profile?.links?.map((link, i) => (
              <LI
                style={renderStyle({
                  "background-color": "var(--fart-lighter-dark-green)",
                  "border-radius": "1em",
                  padding: "1em 0",
                })}
              >
                <H4 style={renderStyle({ margin: "0 20px" })}>
                  {renderLinkString(i, link.title)}
                </H4>
                <LinkForm profile={props.profile} index={i} />
              </LI>
            ))}
          </UL>
        )}
    </SECTION>
  );
}
