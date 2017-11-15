import * as request from 'superagent';
import { IIssueTrackerApi } from './IIssueTrackerApi';

/**
 * Wrapper class for Atlassian Jira's API
 *
 * @author drexler
 */
export class Jira implements IIssueTrackerApi {

  private readonly apiAccessKey: string;
  private readonly apiBaseUri: string;

  /**
   * Creates an instance of Atlassian Jira's API wrapper class
   * @param {string} apiAccessKey - Oauth/Basic Authentication token for api access.
   * @param {string} apiBaseUri - The base uri for the the api service.
   * Example: https://drexler.atlassian.net/rest/api/2
   */
  public constructor(apiAccessKey: string, apiBaseUri: string) {
    this.apiAccessKey = apiAccessKey;
    this.apiBaseUri = apiBaseUri;
  }

  /**
   * Retrieve an issue's metadata by its alias name
   * @param {string} alias - The unique identifier for the issue.
   * @return - Issue's metadata.
   * @throws Will throw an error if the call to Bugzilla's API fails
   */
  public async getIssue(alias: string): Promise<any> {
    const url = `${this.apiBaseUri}/issue/${alias}`;
    const response = await request
      .get(url)
      .set('Authorization', this.apiAccessKey)
      .set('Accept', 'application/json');

    return response.body;
  }

  /**
   * Retrieve a specified issue's comments
   * @param {string} alias - The unique identifier for the issue.
   * @return - List of comments for the issue.
   * @throws Will throw an error if the call to Bugzilla's API fails
   */
  public async getComments(alias: string): Promise<any> {
    const url = `${this.apiBaseUri}/issue/${alias}/comment`;
    const response = await request
      .get(url)
      .set('Authorization', this.apiAccessKey)
      .set('Accept', 'application/json');

    return response.body;
  }

}
