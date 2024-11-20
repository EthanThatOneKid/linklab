/**
 * Profile is a Linklab profile.
 */
export interface Profile {
  id: string;
  ownerGitHubUserID: string;
  links: ProfileLink[];
  title?: string;
  description?: string;
  iconURL?: string;
  colorStyle?: string;
  backgroundStyle?: string;
}

/**
 * ProfileLink is a Linklab link.
 */
export interface ProfileLink {
  title: string;
  url: string;
  iconURL?: string;
}
