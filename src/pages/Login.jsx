import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import './login.css';
import Loading from '../Components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.enableInput = this.enableInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      userName: '',
      redirect: false,
      loading: false,
      disabledBtn: true,
    };
  }

  handleLogin() {
    const { userName, loading } = this.state;
    this.setState({ loading: !loading }, async () => {
      await createUser({ name: userName });
      this.setState({ loading: false });
      this.setState({ redirect: true });
    });
  }

  enableInput({ target }) {
    const { value } = target;
    const numberMinToEnable = 3;
    if (value.length >= numberMinToEnable) {
      this.setState({ disabledBtn: false });
    } else {
      this.setState({ disabledBtn: true });
    }

    // Recupera o valor digitado no input
    this.setState({ userName: value });
  }

  render() {
    const { disabledBtn, loading, redirect } = this.state;
    const loginInterface = (
      <>
        <label htmlFor="name-login" className="label-login">
          Login
          <input
            data-testid="login-name-input"
            type="text"
            id="name-login"
            className="input-format name-login"
            onChange={ this.enableInput }
          />
        </label>
        <button
          data-testid="login-submit-button"
          className="btn-login"
          type="button"
          disabled={ disabledBtn }
          onClick={ this.handleLogin }
        >
          ENTRAR
        </button>
      </>
    );
    return (
      <div data-testid="page-login" className="page-login">
        <div className="container-login">
          <h2 className="title-login">
            Faça seu login e ouça as musicas do seu artista favorito!
          </h2>
          { loading
            ? <Loading /> : loginInterface}
          { redirect ? <Redirect to="/search" /> : null }
        </div>
      </div>
    );
  }
}

export default Login;
