import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import VerticalMenu from './coreUi/VerticalMenu';
import NevBar from './coreUi/NavBar';


class AdminIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0, isOpen: false, menuItems: [], icons: [], refs: [],
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      hello: 'hello',
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    React.Children.forEach(this.props.children, (element) => {
      if (!React.isValidElement(element)) return;
      const { name, icon, reference } = element.props;
      const oldRef = this.state.refs;
      const oldsState = this.state.menuItems;
      const oldIcon = this.state.icons;

      oldRef.push(reference);
      oldsState.push(name);
      (icon) ? oldIcon.push(icon) : oldIcon.push('fas fa-box');

      this.setState({ menuItems: oldsState, icons: oldIcon, refs: oldRef });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }


  render() {
    const children = React.Children.map(this.props.children, (child, i) => React.cloneElement(child, { reference: this.state.refs[i], title: this.state.menuItems[i] }));
    return (
      <div style={{ backgroundColor:'#F8F9FA' , minWidth:'100%', minHeight: '100%', position: 'absolute'}}>
        <NevBar icons={this.state.icons} menu={this.state.menuItems} toggle={this.toggle} isOpen={this.state.isOpen} width={this.state.width} />

        <Row >
          <VerticalMenu icons={this.state.icons} menu={this.state.menuItems} isOpen={this.state.isOpen} width={this.state.width} />
          <Col>
            {
                children
            }
          </Col>
        </Row>
      </div>
    );
  }
}


AdminIndex.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AdminIndex.defaultProps = {
  children: null,
};
export default AdminIndex;
