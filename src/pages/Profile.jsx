import React from 'react';
import Header from '../Components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Página de profile :D</p>
      </div>
    );
  }
}

export default Profile;
