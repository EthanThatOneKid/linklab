export const API_PREFIX = "/api";

export function makeProfilesURL(): string {
  return "/profiles";
}

export function makeProfileURL(profileID: string): string {
  return `${makeProfilesURL()}/${profileID}`;
}

export function makeLinksURL(profileID: string): string {
  return `${makeProfileURL(profileID)}/links`;
}

export function makeLinkURL(profileID: string, linkID?: string): string {
  return `${makeLinksURL(profileID)}${
    linkID !== undefined ? `/${linkID}` : ""
  }`;
}

export function makeDeploymentsURL(profileID: string): string {
  return `${makeProfileURL(profileID)}/deployments`;
}

export function makeDeploymentURL(
  profileID: string,
  deploymentID: string,
): string {
  return `${makeDeploymentsURL(profileID)}/${deploymentID}`;
}

export function makeUsersURL(): string {
  return "/users";
}

export function makeUserURL(userID: string): string {
  return `${makeUsersURL()}/${userID}`;
}
