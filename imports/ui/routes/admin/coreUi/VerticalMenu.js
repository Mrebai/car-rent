import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Col, Nav, NavItem, NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const itemStyle = {
  textDecoration: 'none',
  fontSize: '16px',
  margin: ' 5px 0',
  marginLeft: '5px',
  color: '#FFFFFF',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#FFFFFF',
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
            sm={1}
            style={{
              backgroundColor: 'blue', minHeight: '100%', position: 'absolute', margin: '0 4px', maxWidth: '70px',
            }}
          />
          <Col className="m-0" sm={1} style={{ backgroundColor: 'red', minHeight: '100%', maxWidth: '70px' }}>
            <Nav vertical>
              {
                icons.map((icon, key) => (
                  <NavItem style={itemStyle} key={key}>
                    <Link style={linkStyle} to={`/admin/${menu[key]}/1/10`}>
                      <i className={icon} />
                    </Link>
                  </NavItem>
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
            sm={2}
            style={{
              backgroundColor: 'blue', minHeight: '100%', position: 'absolute', margin: '0 6px',
            }}
          />
          <Col className="m-0" sm={2} style={{ backgroundColor: 'red', minHeight: '100%' }}>
            <Nav vertical>
              {
                    icons.map((icon, key) => (
                      <NavItem key={key} style={itemStyle}>
                        <Link style={linkStyle} to={`/admin/${menu[key]}/1/10`}>
                          <i className={icon} />
                          <span className="ml-1">{menu[key]}</span>
                        </Link>
                      </NavItem>
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
