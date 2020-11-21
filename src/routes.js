import React from "react";
import { Route } from "react-router-dom";

import HomepageLayout from "./containers/Home";
import Profile from "./containers/Profile";
import Hoc from "./hoc/hoc";

const BaseRouter = () => (
  <Hoc>
    <Route exact path='/' component={HomepageLayout}/>
    <Route exact path='/profile/' component={Profile}/>
  </Hoc>
);

export default BaseRouter;