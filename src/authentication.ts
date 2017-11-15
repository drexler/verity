import * as request from 'superagent';

/**
 * Generic base class for generating authentication bearer tokens with a remote
 * service
 * @author drexler
 */

export abstract class Authenticator {

  protected apiKey: string;
  protected apiSecret: string;
  protected authUrl: string;

  constructor(authUrl: string, apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.authUrl = authUrl;
  }

  public async getAccessToken(): Promise<any> {
    const base64BasicAuthToken = new Buffer(`${this.apiKey}:${this.apiSecret}`).toString('base64');
    const response = await request
      .post(this.authUrl)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${base64BasicAuthToken}`)
      .set('Accept', 'application/json')
      .send({ grant_type: 'client_credentials' });

    return response.body.access_token;
  }

}
