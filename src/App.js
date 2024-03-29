import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class App extends Component {
  render() {
    return (
      <main className="w-screen h-screen">
        <Switch>
          <Route exact path="/trybewallet" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </main>
    );
  }
}
