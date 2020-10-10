import React from 'react';
import { Route } from 'react-router-dom';

import Login from './containers/Login';
import Signup from './containers/Signup';
import HomepageLayout from './containers/Home';
import Profile from "./containers/Profile";
import Hoc from './hoc/hoc';
import { HOST_URL } from './settings';

const BaseRouter = () => (
  <Hoc>
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={Signup}/>
    <Route exact path='/' component={HomepageLayout}/>
    <Route exact path='/swagger/' render={() => (window.location = `${HOST_URL}/api/docs/`)} />
    <Route exact path='/profile/' component={Profile}/>
  </Hoc>
);

export default BaseRouter;