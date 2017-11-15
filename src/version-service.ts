import { Github } from './scm/github';
import { Bugzilla } from './issue-tracker/bugzilla';
import { BitBucket } from './scm/bitbucket';
import { Jira } from './issue-tracker/jira';

let parameters: {
  scm: {
    name: string,
    organization: string,
    user: string,
    repo: string
  },
  issueMgr: {
    name: string,
    project: string,
    issueIdOrAlias: string | number,
    apiAccessToken: string
  }
};

function buildLambdaErrorResponse(statusCode: number, message: string, developerMessage: any): any {
  const payload = {
    httpStatus: statusCode,
    message,
    developerMessage
  };

  return {
    statusCode: payload.httpStatus,
    body: JSON.stringify(payload)
  };
}

export async function generate(event: any, context: any, callback: any) {
  let response: any;

  // validate request
  try {
    parameters = JSON.parse(event.body);
  } catch (error) {
    response = buildLambdaErrorResponse(400, 'Invalid request', error.message);
    callback(undefined, response);
  }

  const scm = parameters.scm;

  if (scm.name !== 'BitBucket') {
    response = buildLambdaErrorResponse(400, 'Invalid request', `unsupported issue manager: ${scm.name}`);
    callback(undefined, response);
  } else {

    const authUrl = `${process.env.SCM_AUTH_URL}`;
    const apiKey = `${process.env.SCM_API_KEY}`;
    const apiSecret = `${process.env.SCM_API_SECRET}`;

    try {
      const bitbucketApi = new BitBucket(apiKey, apiSecret, authUrl, scm.organization, scm.user);
      const repos = await bitbucketApi.listRepositories();
      const latestTag = await bitbucketApi.latestTag(scm.repo);
      const tags = await bitbucketApi.listTags(scm.repo);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          repositories: repos,
          nightshade: {
            latestTag,
            tags
          }
        })
      };
      callback(undefined, response);
    } catch (error) {
      response = buildLambdaErrorResponse(error.status, 'Unable to return latest version', error);
      callback(undefined, response);
    }
  }
}
