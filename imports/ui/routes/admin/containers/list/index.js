import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListNav from './ListNav';


class List extends Component {
  render() {
    const children = React.Children.map(this.props.children, (child, i) => React.cloneElement(child, { name: this.props.name, reference: this.props.reference, match: this.props.match }));
    return (
      <div>
        {
            children
          }

      </div>
    );
  }
}

List.propTypes = {
  name: PropTypes.string,
  reference: PropTypes.string,
  match: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

List.defaultProps = {

  children: null,
};

export default List;
