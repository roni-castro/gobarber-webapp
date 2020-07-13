import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';
import Signup from '../screens/Signup';
import CustomRoute from './CustomRoute';

const Routes: React.FC = () => (
  <Switch>
    <CustomRoute path="/" exact component={Login} />
    <CustomRoute path="/signup" component={Signup} />
    <CustomRoute path="/dashboard" component={Dashboard} isPrivate />
    <CustomRoute path="/forgot-password" component={ForgotPassword} />
    <CustomRoute path="/reset-password" component={ResetPassword} />
  </Switch>
);

export default Routes;
