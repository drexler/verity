import * as request from 'superagent';
import { ISourceCodeManagerApi } from './ISourceCodeManagerApi';

/**
 * Wrapper class for Github's API
 *
 * @author drexler
 */
export class Github implements ISourceCodeManagerApi {

  private static readonly baseUri = 'https://api.github.com';
  private accessToken: string;
  private organization?: string;
  private user?: string;

  /**
   * Creates an instance of the Github's API wrapper class
   * @param {string} accessToken - Oauth token for api access.
   * @param {string} [organization] - Name of organization with ownership of repositories.
   * @param {string} [user] - Name of user with ownership of repositories.
   */
  public constructor(accessToken: string, organization?: string, user?: string) {
    this.accessToken = accessToken;
    this.organization = organization;
    this.user = user;
  }

  /**
   * Retrieves a list of available repositories
   * @return - List of respositories available.
   * @throws Will throw an error if the call to GitHub's api fails
   */
  public async listRepositories(): Promise<any> {
    const url = `${Github.baseUri}/users/${this.user}/repos`;
    return await this.apiGetResourceCollection(url);
  }

  /**
   * Retrieves a list of branches within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of branches in the respository.
   * @throws Will throw an error if the call to GitHub's api fails
   */
  public async listBranches(repository: string): Promise<any> {
    const url = `${Github.baseUri}/repos/${this.user}/${repository}/branches`;
    return await this.apiGetResourceCollection(url);
  }

  /**
   * Retrieves a list of commit tags within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of commit tags in the respository.
   * @throws Will throw an error if the call to GitHub's api fails
   */
  public async listTags(repository: string): Promise<any> {
    const url = `${Github.baseUri}/repos/${this.user}/${repository}/tags`;
    return await this.apiGetResourceCollection(url);
  }

  /**
   * Retrieves the latest commit tag within a given repository
   * @param {string} respository - The name of the repository.
   * @return - Most recent tag in the respository.
   * @throws Will throw an error if the call to GitHub's api fails
   */
  public async latestTag(repository: string): Promise<string> {
    const tags =  await this.listTags(repository);
    return tags[0];
  }

  /**
   * Retrieves a named collection of resources witin a specified repository
   * @param {string} url - uri to the resource collection
   * @return - List of items within the resource collection.
   * @throws Will throw an error if the call to GitHub's api fails
   */
  private async apiGetResourceCollection(url: string): Promise<any> {
    const response = await request
                        .get(url)
                        .set('Accept', 'application/json');

    return await Promise.all(response.body.map(async (resourceItem): Promise<any> => {
      return resourceItem.name;
    }));
  }

}
