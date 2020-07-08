import React from 'react';
import { Switch } from 'react-router-dom';
import CustomRoute from './CustomRoute';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Dashboard from '../screens/Dashboard';
import ForgotPassword from '../screens/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <CustomRoute path="/" exact component={Login} />
    <CustomRoute path="/signup" component={Signup} />
    <CustomRoute path="/dashboard" component={Dashboard} isPrivate />
    <CustomRoute path="/forgot-password" component={ForgotPassword} />
  </Switch>
);

export default Routes;
