import React, { Component } from 'react';

import UserController from '../../controllers/user.controller';
import ListsForm from './ListsForm';
import Loader from '../loader/Loader';

import './Lists.scss';

export default class Lists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: null,
      ok: false,
      formDisplayed: false
    };

    UserController.checkSession()
      .then(() => {
        UserController.getUserInfo()
          .then((user) => {
            this.setState({ user: user, ok: user != null, loading: false });
          })
          .catch((error) => this.setState({ loading: false, ok: false }))
      })
      .catch((error) => this.setState({ loading: false, ok: false }))
  }

  createList = (data) => {
    const { user } = this.state;
    this.setState({ loading: true });
    UserController.createList(user, data.name)
      .then(list => {
        const user = this.state.user;
        user.lists.push(list);
        this.setState({ loading: false, user: user, formDisplayed: false });
      })
      .catch(error => this.setState({ loading: false, formDisplayed: false }))
  }

  render() {
    const { user, ok, formDisplayed, loading } = this.state;

    return (<div className="Lists">
      { loading && (<div className="block"> <Loader /> </div>) }
      { ok && !loading && (<div className="block"><h3>Mis listas</h3></div>) }
      { ok && !loading && user != null && user.lists.map(list => (<div key={ list.id } className="block">
        <a href={ list.url } target="_blank">
          <h3>{ list.name }</h3>
        </a>
      </div>)) }
      { ok && !loading && ( formDisplayed ?
        (<ListsForm onClose={ (evt) => this.setState({ formDisplayed: false }) } onSubmit={ this.createList } />) :
        (<div className="block"><h3 onClick={(evt) => this.setState({ formDisplayed: true })}>Añadir</h3></div>) )
      }
    </div>);
  }
}
