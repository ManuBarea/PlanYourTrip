import UserClient from '../client/user.client';
import OAuthClient from '../client/oauth.client';
import ApiClient from '../client/api.client';

import CodeHandler from '../mixins/code-handler';

import User, { UserList } from '../model/user';

var codeParameterChecked = false;

export default class UserController {

  static login() {
    window.location.href = OAuthClient.getLoginUrl();
  }

  static checkSession() {
    return new Promise((resolve, reject) => {
      // try to get the code from url
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');

      if (!codeParameterChecked && typeof code === 'string') {
        ApiClient.getAccessToken(code)
          .then((data) => {
            CodeHandler.registerCode(data.access_token);
            resolve();
          }, (error) => reject());
      } else {
        let code = CodeHandler.getCode();
        if (code != null) {
          resolve();
        } else {
          reject();
        }
      }
    });
  }

  static closeSession() {
    CodeHandler.clearCode();
  }

  static getUserInfo() {
    return new Promise((resolve, reject) => {
      UserClient.getUserInfo(CodeHandler.getCode())
        .then(data => {
          if (data.meta != null && data.meta.code === 200) {
            resolve(new User(data.response.user));
          } else {
            reject(new Error('invalid status response'));
          }
        })
        .catch(error => reject(error));
    });
  }

  static createList(user, name) {
    return new Promise((resolve, reject) => {
      UserClient.createList(CodeHandler.getCode(), user.id, name)
        .then(data => {
          if (data.meta != null && data.meta.code === 200) {
            resolve(new UserList(data.response.list));
          } else {
            reject(new Error('invalid status response'));
          }
        })
        .catch(error => reject(error));
    })
  }
}
