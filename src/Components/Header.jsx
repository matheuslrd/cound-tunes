import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';
import NavBar from './NavBar';

class Header extends Component {
  constructor() {
    super();

    this.setUserNameState = this.setUserNameState.bind(this);
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.setUserNameState();
  }

  async setUserNameState() {
    const { name } = await getUser();
    this.setState({ userName: name, loading: false });
  }

  render() {
    const { loading, userName } = this.state;
    const userNameTag = (
      <h3 data-testid="header-user-name" className="header-user-name">
        { userName }
      </h3>);
    return (
      <header className="header" data-testid="header-component">
        <div className="header-top">
          <div className="container-user-name">
            { loading
              ? <Loading />
              : userNameTag}
          </div>
          <div className="logo-header">
            logo
          </div>
        </div>
        <div className="header-bottom">
          <NavBar />
        </div>
      </header>
    );
  }
}

export default Header;
