import { Injectable } from '@nestjs/common'
import { Auth, google } from 'googleapis'

@Injectable()
export class GoogleAuthService {
  oauthClient: Auth.OAuth2Client

  constructor() {
    this.oauthClient = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    )
  }

  async verifyToken(token: string): Promise<any> {
    const userInfoClient = google.oauth2('v2').userinfo

    this.oauthClient.setCredentials({
      access_token: token
    })

    try {
      const userInfoResponse = await userInfoClient.get({
        auth: this.oauthClient
      })

      return userInfoResponse?.data ?? null
    } catch (error) {
      return null
    }
  }
}
