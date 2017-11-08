/**
 * Interface representing a generic ticket management systems' API
 *
 * @author drexler
 */
export interface IIssueTrackerApi {

  /**
   * Retrieve an issue's metadata by its identifier
   * @return - Issue metadata.
   */
  getIssue(id: number): any;

  /**
   * Retrieve a specified issue's comments
   * @param {number} issueId - The unique identifier for the issue
   * @return - List of comments for the issue.
   */
  getComments(issueId: number): any;

}
