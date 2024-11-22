import {
  makeDeploymentsURL,
  makeLinksURL,
  makeProfileURL,
} from "#/lib/urls.ts";

export function makeSettingsTabs(
  activeTab: SettingsTabType,
  profileID: string,
): SettingsTab[] {
  return [
    {
      href: makeProfileURL(profileID),
      content: "General settings",
      isActive: activeTab === "general",
    },
    {
      href: makeLinksURL(profileID),
      content: "Manage links",
      isActive: activeTab === "links",
    },
    {
      href: makeDeploymentsURL(profileID),
      content: "Deployments",
      isActive: activeTab === "deployments",
    },
  ];
}

export interface SettingsTab {
  href: string;
  content: string;
  isActive?: boolean;
}

export type SettingsTabType = typeof settingsTabs[number];

export const settingsTabs = [
  "general",
  "links",
  "deployments",
] as const;
