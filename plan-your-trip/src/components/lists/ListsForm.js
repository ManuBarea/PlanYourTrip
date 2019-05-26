import React, { Component } from 'react';

export default class ListsForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  submit = (evt) => {
    this.props.onSubmit({
      name: this.state.name
    });

    this.setState({ name: '' });

    evt.preventDefault();
    evt.stopPropagation();
    return false;
  }

  render() {
    const { name } = this.state;

    return (<form className="ListsForm block" onSubmit={ this.submit } >
      <div>
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="Nombre" onChange={ (evt) => this.setState({ name: evt.target.value }) }  value={ name } />
      </div>

      <div>
        <input type="submit" value="Crear" />
        <button onClick={ (evt) => this.props.onClose() }>Cancelar</button>
      </div>
    </form>)
  }

}
