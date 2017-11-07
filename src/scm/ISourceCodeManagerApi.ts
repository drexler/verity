/**
 * Interface representing a generic source code manager's API
 *
 * @author drexler
 */
export interface ISourceCodeManagerApi {

  /**
   * Retrieves a list of available repositories
   * @return - List of respositories available.
   */
  listRepositories(): any;

  /**
   * Retrieves a list of branches within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of branches in the respository.
   */
  listBranches(repository: string): any;

  /**
   * Retrieves a list of commit tags within a given repository
   * @param {string} respository - The name of the repository.
   * @return - List of commit tags in the respository.
   */
  listTags(repository: string): any;

  /**
   * Retrieves the latest commit tag within a given repository
   * @param {string} respository - The name of the repository.
   * @return {string} - Most recent tag in the respository.
   */
  latestTag(repository: string): any;
}
