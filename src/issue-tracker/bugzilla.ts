import * as request from 'superagent';
import { IIssueTrackerApi } from './IIssueTrackerApi';

/**
 * Wrapper class for Bugzilla's API
 *
 * @author drexler
 */
export class Bugzilla implements IIssueTrackerApi {

  private readonly apiAccessKey: string;
  private readonly apiBaseUri: string;

  /**
   * Creates an instance of Bugzilla's API wrapper class
   * @param {string} apiAccessKey - Oauth token for api access.
   * @param {string} apiBaseUri - The base uri for the the api service.
   * Example: https://bugzilla.mozilla.org.
   */
  public constructor(apiAccessKey: string, apiBaseUri: string) {
    this.apiAccessKey = apiAccessKey;
    this.apiBaseUri = apiBaseUri;
  }

  /**
   * Retrieve an issue's metadata by its identifier
   * @param {number} id - The unique identifier for the issue.
   * @return - Issue's metadata.
   * @throws Will throw an error if the call to Bugzilla's API fails
   */
  public async getIssue(id: number): Promise<any> {
    const url = `${this.apiBaseUri}/rest/bug/${id}`;
    const response = await request
      .get(url)
      .set('Accept', 'application/json');

    return response.body;
  }

  /**
   * Retrieve a specified issue's comments
   * @param {number} issueId - The unique identifier for the issue
   * @return - List of comments for the issue.
   * @throws Will throw an error if the call to Bugzilla's API fails
   */
  public async getComments(issueId: number): Promise<any> {
    const url = `${this.apiBaseUri}/rest/bug/${issueId}/comment`;
    const response = await request
      .get(url)
      .set('Accept', 'application/json');

    return response.body;
  }

}
