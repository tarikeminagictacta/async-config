import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UserManager, UserManagerSettings, WebStorageStateStore, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private configuration: any;
  user: User;

  get userManagerSettings(): UserManagerSettings {
    return {
      authority: 'https://fs.constructiv-int.be/adfs',
      client_id: 'co-ctx-client-dev',
      redirect_uri: `${this.config.config.redirect_uri}`,
      scope: 'openid',
      response_type: 'id_token token',
      post_logout_redirect_uri: 'https://ctx.constructiv-dev.be/',
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      loadUserInfo: false
    };
  }

  get userManager(): UserManager {
    return new UserManager(this.userManagerSettings);
  }

  constructor(private config: ConfigService) {
    this.configuration = this.config.config;
    this.userManager.getUser().then(user => {
      this.user = user;
      console.log(user);
      console.log('user fetched');
    });
  }

  startAuthentication(): Promise<any> {
    return this.userManager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
      console.log('auth done');
      console.log(user);
    });
  }
}
