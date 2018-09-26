import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import ListFilter from './filter';

class ListNav extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand>
          <NavbarBrand>{this.props.title}</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/"><i className="fas fa-plus" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap"><i className="fas fa-trash" /></NavLink>
            </NavItem>
            <ListFilter />
          </Nav>
        </Navbar>
      </div>
    );
  }
}

ListNav.propTypes = {
  title: PropTypes.string,
};

export default ListNav;
