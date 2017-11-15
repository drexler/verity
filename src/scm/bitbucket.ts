import * as request from 'superagent';
import { ISourceCodeManagerApi } from './ISourceCodeManagerApi';
import { Authenticator} from '../authentication';

/**
 * Wrapper class for BitBucket's API
 *
 * @author drexler
 */
export class BitBucket
  extends Authenticator
  implements ISourceCodeManagerApi {

  private static readonly baseUri = 'https://api.bitbucket.org/2.0';
  private accessToken: string;
  private organization?: string;
  private user?: string;

  /**
   * Creates an instance of the BitBucket's API wrapper class
   * @param {string} accessToken - Oauth/Basic Authentication token for api access.
   * @param {string} [organization] - Name of organization with ownership of repositories.
   * @param {string} [user] - Name of user with ownership of repositories.
   */
  public constructor(apiKey: string, apiSecret: string, authUrl: string, organization?: string, user?: string) {
    super(authUrl, apiKey, apiSecret);
    this.organization = organization;
    this.user = user;
    this.accessToken = undefined;
  }

  /**
   * Retrieves a list of available repositories
   * @return - List of respositories available.
   * @throws Will throw an error if the call to BitBucket's API api fails
   */
  public async listRepositories(): Promise<any> {
    const url = `${BitBucket.baseUri}/repositories/${this.user}`;
    return await this.apiGetResourceCollection(url);
  }

  /**
   * Retrieves a list of branches within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of branches in the respository.
   * @throws Will throw an error if the call to BitBucket's API fails
   */
  public async listBranches(repository: string): Promise<any> {
    const url = `${BitBucket.baseUri}/repositories/${this.user}/${repository}/refs/branches`;
    return await this.apiGetResourceCollection(url);
  }

  /**
   * Retrieves a list of commit tags within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of commit tags in the respository.
   * @throws Will throw an error if the call to BitBucket's API fails
   */
  public async listTags(repository: string): Promise<any> {
    const url = `${BitBucket.baseUri}/repositories/${this.user}/${repository}/refs/tags`;
    return await this.apiGetResourceCollection(url);
  }

  /**
   * Retrieves the latest commit tag within a given repository
   * @param {string} repository - The name of the repository.
   * @return - Most recent tag in the respository.
   * @throws Will throw an error if the call to BitBucket's API fails
   */
  public async latestTag(repository: string): Promise<string> {
    const tags = await this.listTags(repository);
    return tags[0];
  }

  /**
   * Retrieves a named collection of resources witin a specified repository
   * @param {string} url - uri to the resource collection
   * @return - List of items within the resource collection.
   * @throws Will throw an error if the call to BitBucket's api fails
   */
  private async apiGetResourceCollection(url: string): Promise<any> {
    this.accessToken = await super.getAccessToken();
    const response = await request
      .get(url)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .set('Accept', 'application/json');

    return await Promise.all(response.body.values.map(async (resourceItem): Promise<any> => {
      return resourceItem.name;
    }));
  }
}
