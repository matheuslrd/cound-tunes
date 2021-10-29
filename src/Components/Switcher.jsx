import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import ProfileEdit from '../pages/ProfileEdit';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

class Switcher extends Component {
  render() {
    return (
      <Switch>
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    );
  }
}

export default Switcher;
