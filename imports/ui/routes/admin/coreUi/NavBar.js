import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

    const linkStyle = {
        textDecoration: 'none',
        color: '#323539' ,
        fontSize: '1.2rem',
        margin:'.5rem 1rem',
        marginRight:'0',

    };
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
                    {
                        this.props.menu.map((item, key) => (
                          <Link style={linkStyle} to={`${/admin/ + item}/1/10`} key={key}>
                            <NavItem >
                              <i className={this.props.icons[key]} />
                              <span className="mr-2">
                                {item}
                              </span>
                            </NavItem>
                          </Link>
                        ))
                      }

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
  icons: PropTypes.array.isRequired,
};

export default MainNavBar;
