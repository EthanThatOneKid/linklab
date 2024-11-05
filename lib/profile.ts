/**
 * Profile is a Linklab profile.
 */
export interface Profile {
  title: string;
  description?: string;
  iconURL?: string;
  colorStyle?: string;
  backgroundStyle?: string;
  links?: Link[];
}

/**
 * Link is a Linklab link.
 */
export interface Link {
  title: string;
  url: string;
  iconURL?: string;
}
