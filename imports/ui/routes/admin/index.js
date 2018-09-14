import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import VerticalMenu from './coreUi/VerticalMenu';
import NevBar from './coreUi/NavBar';
import TryList from './containers/list/components/TryList';

class AdminIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, isOpen: false };
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
    console.log(`i say ${() =>this.state.hello}`);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }


  render() {
    return (
      <div className="">
        <NevBar toggle={this.toggle} isOpen={this.state.isOpen} width={this.state.width} />

        <Row>
          <VerticalMenu isOpen={this.state.isOpen} width={this.state.width} />
          <Col>
            <TryList />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdminIndex;
