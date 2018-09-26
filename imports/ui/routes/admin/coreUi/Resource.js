import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { List, Create } = { ...this.props };

    return (
      <div>
        <Switch>
          <Route
            exact
            path={`/admin/${this.props.name}` + '/new'}
            render={match => <Create match={match.match} {...this.props} />}
          />

          <Route
            exact
            path={`/admin/${this.props.name}` + '/:page?/:perPage?'}
            render={match => <List match={match.match} {...this.props} />}
          />
        </Switch>
      </div>

    );
  }
}

export default Resource;
