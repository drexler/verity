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
    const response = await request
                        .get(url)
                        .set('Accept', 'application/json');

    return await Promise.all(response.body.map(async (repo): Promise<any> => {
      return repo.name;
    }));
  }

  /**
   * Retrieves a list of branches within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of branches in the respository.
   * @throws Will throw an error if the call to GitHub's api fails
   */
  public async listBranches(repository: string): Promise<any> {
    const url = `${Github.baseUri}/repos/${this.user}/${repository}/branches`;
    const response = await request
                        .get(url)
                        .set('Accept', 'application/json');

    return await Promise.all(response.body.map(async (branch): Promise<any> => {
      return branch.name;
    }));
  }

  /**
   * Retrieves a list of commit tags within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of commit tags in the respository.
   * @throws Will throw an error if the call to GitHub's api fails
   */
  public async listTags(repository: string): Promise<any> {
    const url = `${Github.baseUri}/repos/${this.user}/${repository}/tags`;
    const response = await request
                        .get(url)
                        .set('Accept', 'application/json');

    return await Promise.all(response.body.map(async (tag): Promise<any> => {
      return tag.name;
    }));
  }

}
