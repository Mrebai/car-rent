import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';


class MainNavBar extends React.Component {
  render() {
    const { toggle, isOpen, width } = this.props;
    return (
      <div>
        <Navbar color="light" light>
          <NavbarToggler onClick={toggle} />
          <NavbarBrand href="/">Home</NavbarBrand>
          {(width <= 768
                && (
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>


                                Options
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>


                                    Option 1
                        </DropdownItem>
                        <DropdownItem>


                                    Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            Reset
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
                )
            )}
        </Navbar>
      </div>
    );
  }
}

MainNavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default MainNavBar;
