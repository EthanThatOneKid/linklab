/**
 * User is a Linklab user.
 */
export interface User {
  /**
   * githubID is the user's GitHub ID.
   */
  githubID: string;

  /**
   * githubLogin is the user's GitHub username.
   */
  githubLogin: string;

  /**
   * profilesByID is a list of profile IDs owned by the user.
   */
  profilesByID: string[];
}
