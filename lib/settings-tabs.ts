import { makeProfileLinksURL, makeProfileURL } from "#/lib/urls.ts";

export function makeSettingsTabs(
  activeTab: "general" | "links",
  profileID: string,
): SettingsTab[] {
  return [
    {
      href: makeProfileURL(profileID),
      content: "General settings",
      isActive: activeTab === "general",
    },
    {
      href: makeProfileLinksURL(profileID),
      content: "Links settings",
      isActive: activeTab === "links",
    },
  ];
}

export interface SettingsTab {
  href: string;
  content: string;
  isActive?: boolean;
}
