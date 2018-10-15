import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Col, Nav, NavItem, NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const linkStyle = {
  textDecoration: 'none',
  color: '#FFFFFF',
  fontSize: '1.2rem',
  margin:'.5rem 1rem',
  marginRight:'0',

};

const VerticalMenu = ({
  width, isOpen, icons, menu,
}) => (
  <Fragment>
    {
      (width > 768 && !isOpen
        && (
        <Fragment>

          <Col
            className="m-0"
            sm={1}
            style={{
              backgroundColor: '#323539', minHeight: '100vh', margin: '0 4px', maxWidth: '70px',
            }}
          >
            <Nav vertical>
              {
                icons.map((icon, key) => (
                  <Link style={linkStyle}  key={key} to={`/admin/${menu[key]}/1/10`}>
                    <NavItem>
                      <i className={icon} />
                    </NavItem>
                  </Link>
                ))
              }

            </Nav>
          </Col>
        </Fragment>
        )
      )
    }
    {
      (width > 768 && isOpen
        && (
        <Fragment>

          <Col
            className="m-0"
            sm={2}
            style={{
              backgroundColor: '#323539', minHeight: '100vh', margin: '0 4px',
            }}
          >
            <Nav vertical>
              {
                    icons.map((icon, key) => (
                      <Link style={linkStyle} to={`/admin/${menu[key]}/1/10`} key={key}>
                        <NavItem>

                          <i className={icon} />
                          <span className="ml-2">{menu[key]}</span>

                        </NavItem>
                      </Link>
                    ))
                }


            </Nav>
          </Col>
        </Fragment>
        )
      )
    }
  </Fragment>
);

VerticalMenu.propTypes = {
  width: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  icons: PropTypes.array.isRequired,
  menu: PropTypes.array.isRequired,
};

export default VerticalMenu;
