import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UserManager, WebStorageStateStore } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;

  constructor(private config: ConfigService) {
    console.log(this.config.config);
    this._userManager = new UserManager({
      authority: 'https://fs.constructiv-int.be/adfs',
      client_id: 'co-ctx-client-dev',
      redirect_uri: `${this.config.config.redirect_uri}`,
      scope: 'openid',
      response_type: 'id_token token',
      post_logout_redirect_uri: 'https://ctx.constructiv-dev.be/',
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      loadUserInfo: false
    });
    this._userManager.getUser().then(user => {
      console.log('user fetched');
    });
  }
}
