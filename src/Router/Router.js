import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import DialogPage from '../components/ChatPage';
import NoMatch from '../components/NoMatch';
import Header from '../components/Header';

import './Router.css';

const Router = () => {
  return (
    <div className="router-container">
      <Header />
      <Switch>
        <Route path="/dialog">
          <DialogPage />
        </Route>
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

export default Router;
