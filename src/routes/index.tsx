import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
  </Switch>
);

export default Routes;
