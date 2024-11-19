export function makeProfilesURL(): string {
  return "/profiles";
}

export function makeProfileURL(profileID: string): string {
  return `${makeProfilesURL()}/${profileID}`;
}

export function makeProfileLinksURL(profileID: string): string {
  return `${makeProfileURL(profileID)}/links`;
}

export function makeProfileLinkURL(profileID: string, linkID: string): string {
  return `${makeProfileLinksURL(profileID)}/${linkID}`;
}

export function makeUsersURL(): string {
  return "/users";
}

export function makeUserURL(userID: string): string {
  return `${makeUsersURL()}/${userID}`;
}
