import React from 'react';

import { Switch } from 'react-router-dom';

import PrivateRoute from './Route';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Details from '../pages/Details';
import CreateEvent from '../pages/CreateEvent';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute component={Login} path="/" exact />
      <PrivateRoute component={SignUp} path="/registrar" />
      <PrivateRoute component={Dashboard} path="/inicio" isPrivate={true} />
      <PrivateRoute
        component={Details}
        path="/evento/:event_id"
        isPrivate={true}
      />
      <PrivateRoute
        component={CreateEvent}
        path="/criar-evento"
        isPrivate={true}
      />
      <PrivateRoute component={Profile} path="/perfil" isPrivate={true} />
    </Switch>
  );
};

export default Routes;
