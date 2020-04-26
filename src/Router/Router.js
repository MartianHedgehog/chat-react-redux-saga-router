import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from '../components/MainPage';
import DialogPage from '../components/ChatPage';
import PrivateRoute from '../components/PrivateRoute';
import NoMatch from '../components/NoMatch';
import Header from '../components/Header';

import './Router.css';

const Router = () => {
  return (
    <div className="router-container">
      <Header />
      <Switch>
        <PrivateRoute path="/dialog">
          <DialogPage />
        </PrivateRoute>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (state) => {
  const { userInformation } = state;
  const { username } = userInformation;
  return {
    username,
  };
};

export default connect(mapDispatchToProps, null)(Router);
