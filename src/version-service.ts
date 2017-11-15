import { Github } from './scm/github';
import { Bugzilla } from './issue-tracker/bugzilla';
import { BitBucket } from './scm/bitbucket';
import { Jira } from './issue-tracker/jira';

let parameters: {
  scm: {
    name: string,
    organization: string,
    user: string,
    apiAccessToken: string
  },
  issueMgr: {
    name: string,
    project: string,
    issueIdOrAlias: string | number,
    apiAccessToken: string
  }
};

function buildLambdaErrorResponse(statusCode: number, message: string, developerMessage: any): any {
  return {
    httpStatus: statusCode,
    message,
    developerMessage
  };
}

export async function generate(event: any, context: any, callback: any) {
  let response: any;
  let responseBody: any;

  try {
    parameters = JSON.parse(event.body);
    response = {
      statusCode: 200,
      body: JSON.stringify(parameters)
    };
    callback(undefined, response);

  } catch (error) {
    responseBody = buildLambdaErrorResponse(400, 'Invalid request', error.message);
    response = {
      statusCode: responseBody.httpStatus,
      body: JSON.stringify(responseBody)
    };
    callback(undefined, response);
  }

}
