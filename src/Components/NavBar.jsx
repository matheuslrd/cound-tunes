import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/search"
              className="link-search"
              data-testid="link-to-search"
            >
              Pesquisa
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/favorites"
              className="link-favorites"
              data-testid="link-to-favorites"
            >
              Favoritos
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
