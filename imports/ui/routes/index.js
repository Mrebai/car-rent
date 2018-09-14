import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Home from './Home';
import AdminIndex from './admin';

export default RouteIndex = () => (
  <div className="">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={AdminIndex} />
      </Switch>
    </BrowserRouter>
  </div>
);
