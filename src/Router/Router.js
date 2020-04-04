import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import DialogPage from '../components/DialogPage';
import NoMatch from '../components/NoMatch';

const Router = () => {
  return (
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
  );
};

export default Router;
