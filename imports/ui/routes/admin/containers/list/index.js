import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListNav from './ListNav';


class List extends Component {
    constructor(props){
      super(props);
      // get search params
      this.searchVars = this.searchVars.bind(this);
      // search field
      this.state = {q :''}
    }
    // get search far from child component
    searchVars = (val) => {
      this.setState({q:val})
    };

  render() {
    const children = React.Children.map(this.props.children, (child, i) => React.cloneElement(child, {q:this.state.q, name: this.props.name, reference: this.props.reference, match: this.props.match }));
    return (
      <div>
        <ListNav name={this.props.name} searchVars={this.searchVars} title={this.props.title} />
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
