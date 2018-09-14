import React, { Component } from 'react';
import ListNav from './ListNav';
class List extends Component {
  render() {
    const filter = 'filter value';
    return (
      <div>
        <ListNav />
          {
            this.props.children
          }
      </div>
    );
  }
}

export default List;
