import {Github} from './scm/github';
import {Bugzilla} from './issue-tracker/bugzilla';

export async function generate(event: any, context: any, callback: any) {

  const githubApi = new Github('access token', undefined, 'drexler');
  const repos = await githubApi.listRepositories();
  const branches = await githubApi.listBranches('verity');
  const tags = await githubApi.listTags('velson-node');
  const mostRecentTag = await githubApi.latestTag('velson-node');

  // issue tracking
  const bugzillaApi = new Bugzilla('accesstoken', 'https://bugzilla.mozilla.org');
  const ticket = await bugzillaApi.getIssue(699113);
  const comments = await bugzillaApi.getComments(699113);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      version: '3.1.3',
      repositories: repos,
      branchesVerity: branches,
      velsonNodeTags: tags,
      recentTag: mostRecentTag,
      bugzillaTicket: ticket,
      bugzillaComments: comments
    })
  };
  callback(null, response);
}
