import type { Profile } from "#/lib/profile.ts";

export const fakeProfile = {
  id: "abc123",
  title: "EthanThatOneKid",
  owner: {
    githubID: "123",
    githubLogin: "EthanThatOneKid",
    ownedProfiles: [],
  },
  links: [
    {
      title: "Homepage",
      url: "https://etok.me/",
    },
    {
      title: "GitHub",
      url: "https://github.com/EthanThatOneKid",
    },
  ],
} as const satisfies Profile;
