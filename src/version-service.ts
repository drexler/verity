import {Github} from './scm/github';

export async function generate(event: any, context: any, callback: any) {

  const githubApi = new Github('access token', undefined, 'drexler');
  const repos = await githubApi.listRepositories();
  const branches = await githubApi.listBranches('verity');
  const tags = await githubApi.listTags('velson-node');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      version: '3.1.3',
      repositories: repos,
      branchesVerity: branches,
      velsonNodeTags: tags
    })
  };
  callback(null, response);
}
