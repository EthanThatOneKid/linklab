import { A, BR, DIV, H2, LI, P, UL } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { User } from "#/lib/user.ts";
import type { SettingsTab } from "#/lib/settings-tabs.ts";
import { makeUserURL } from "#/lib/urls.ts";

export interface SettingsLayoutProps {
  profile: Profile;
  owner: User;
  tabs: Array<SettingsTab>;
  children?: string[];
}

export function SettingsLayout(props: SettingsLayoutProps) {
  return (
    <DIV>
      <H2>@{props.profile.id}</H2>
      <P>
        Owner:{" "}
        <A href={makeUserURL(props.owner.githubLogin)}>
          {props.owner.githubLogin}
        </A>
      </P>
      {/* TODO: Link to recently deployed project. */}

      <BR />

      <UL class="tabs">
        {props.tabs
          .map((tab) => (
            <LI class="tab">
              <SettingsTab {...tab} />
            </LI>
          ))
          .join("")}
      </UL>

      {(props.children ?? []).join("")}
    </DIV>
  );
}

function SettingsTab(props: SettingsTab) {
  return (
    <A
      href={props.href}
      class={`fart-link-visible-on-hover${props.isActive ? " active" : ""}`}
    >
      {props.content}
    </A>
  );
}
