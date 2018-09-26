import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


class CreateNav extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand>
          <NavbarBrand>{this.props.title}</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/"><i className="fas fa-eye" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap"><i className="fas fa-trash" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap"><i className="fas fa-list" /></NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

CreateNav.propTypes = {
  title: PropTypes.string,
};

export default CreateNav;
