/**
 * Interface representing a generic ticket management systems' API
 *
 * @author drexler
 */
export interface IIssueTrackerApi {

  /**
   * Retrieve an issue's metadata
   * @param {(number|string)} alias - The unique identifier or alias for the issue.
   * @return - Issue metadata.
   */
  getIssue(idOrAlias: number | string): any;

  /**
   * Retrieve a specified issue's comments
   * @param {(number|string)} alias - The unique identifier or alias for the issue.
   * @return - List of comments for the issue.
   */
  getComments(idOrAlias: number | string): any;

}
