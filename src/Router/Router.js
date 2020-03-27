import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">{() => <MainPage />}</Route>
      </Switch>
    </BrowserRouter>
  );
}
