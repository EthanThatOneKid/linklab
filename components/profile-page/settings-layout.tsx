import { A, DIV, H2, LI, UL } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import type { SettingsTab } from "#/lib/settings-tabs.ts";

export interface SettingsLayoutProps {
  profile: Profile;
  tabs: Array<SettingsTab>;
  children?: string[];
}

export function SettingsLayout(props: SettingsLayoutProps) {
  return (
    <DIV>
      <H2>Profile settings: @{props.profile.id}</H2>
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
