import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Home from './Home';
import AdminIndex from './admin';
import Resorce from './admin/coreUi/Resource';
import TryList from './admin/containers/list/components/TryList';
import TryCreate from './admin/containers/create/component/TryCreate';

export default RouteIndex = () => (
  <div className="">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/admin"
          render={router => (
            <AdminIndex match={router.match}>
              <Resorce icon="fab fa-500px" Create={TryCreate} List={TryList}  name="posts" reference="Car" />
              <Resorce List={TryList} Create={TryCreate} name="posts2" reference="Car" />
            </AdminIndex>
          )}
        />
      </Switch>
    </BrowserRouter>
  </div>
);
