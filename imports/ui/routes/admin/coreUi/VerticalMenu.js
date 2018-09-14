import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col ,Nav, NavItem, NavLink } from 'reactstrap';

const VerticalMenu = ({ width,isOpen }) => (
  <Fragment>
    {
      (width > 768 && !isOpen
        && (
        <Fragment>
          <Col sm={1} style={ {backgroundColor: 'blue', minHeight: '100%', position: 'absolute',margin: '0 4px',maxWidth:'70px'} }></Col>
          <Col className={'m-0'} sm={1} style={{ backgroundColor: 'red', minHeight: '100%',maxWidth:'70px'}}>
            <Nav vertical>
              <NavLink href="#" > <i className="fas fa-box"></i> </NavLink>
              <NavLink href="#" > <i className="fas fa-box"></i> </NavLink>
              <NavLink href="#" > <i className="fas fa-box"></i> </NavLink>
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
                  <Col sm={2} style={ {backgroundColor: 'blue', minHeight: '100%', position: 'absolute',margin: '0 6px'} }></Col>
                  <Col className={'m-0'} sm={2} style={{ backgroundColor: 'red', minHeight: '100%'  }}>
                      <Nav vertical>
                          <NavLink style={{marginRight:'0'}} href="#">  <i  className="fas fa-box mr-2"></i>  Link1 </NavLink>
                          <NavLink style={{marginRight:'0'}}  href="#">  <i  className="fas fa-box mr-2"></i>  Link2 </NavLink>
                          <NavLink style={{marginRight:'0'}}  href="#">  <i  className="fas fa-box mr-2"></i>  Link3</NavLink>
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
};

export default VerticalMenu;
