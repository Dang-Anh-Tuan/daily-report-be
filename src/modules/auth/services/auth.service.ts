/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { Auth, google } from 'googleapis'

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client

  async verifyGoogleToken(token: string): Promise<any> {
    const userInfoClient = google.oauth2('v2').userinfo

    this.oauthClient.setCredentials({
      access_token: token
    })

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient
    })
  }
}
