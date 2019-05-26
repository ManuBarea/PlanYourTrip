import React, { Component } from 'react';
import UserController from '../../controllers/user.controller';

import './Login.scss';

import ProfileImage from './profile.svg';
import LogoutImage from './logout.svg';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    UserController.checkSession()
      .then(() => {
        UserController.getUserInfo().then((user) => {
          this.setState({ user: user });
        })
      })
  }

  login = () => UserController.login();

  logout = () => {
    UserController.logout();
    this.setState({ user: null });
  }

  render() {
    const { user } = this.state;

    return (<div className="Login">
      { user != null ? (<div>
        <img src={ LogoutImage } onClick={ this.logout } />
        <div>
          <span>{ user.firstName }</span>
        </div>
      </div>) : (<div>
        <img src={ ProfileImage } onClick={ this.login } />
      </div>)}
    </div>);
  }
}
