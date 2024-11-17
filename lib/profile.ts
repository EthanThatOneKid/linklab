/**
 * Profile is a Linklab profile.
 */
export interface Profile {
  id: string;
  ownerGitHubUserID: string;
  title?: string;
  description?: string;
  iconURL?: string;
  colorStyle?: string;
  backgroundStyle?: string;
  links?: ProfileLink[];
}

/**
 * ProfileLink is a Linklab link.
 */
export interface ProfileLink {
  title: string;
  url: string;
  iconURL?: string;
}
