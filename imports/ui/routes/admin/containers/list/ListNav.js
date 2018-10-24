import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ListFilter from './Filter';

class ListNav extends Component {
  render() {
    return (
      <Fragment>
        <Navbar color="light" light expand>
          <NavbarBrand>{this.props.title}</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <Link to={`/admin/${this.props.name}/new`}>
              <NavItem>
                <span className="nav-link">
                  <i className="fas fa-plus" />
                </span>
              </NavItem>
            </Link>
            <ListFilter searchVars={this.props.searchVars} />
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}

ListNav.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  searchVars: PropTypes.func.isRequired,
};

export default ListNav;
