import React, { Component, Fragment } from 'react';
import {
  DropdownItem,
  NavbarToggler,
  Nav,
  NavItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  Button, Form, FormGroup, Label, Input, FormText,
} from 'reactstrap';

class ListFilter extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      inputVal:'',
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

    updateValue = (e) => {
        this.setState({inputVal: e.target.value});
        this.props.searchVars(e.target.value)
    };

  render() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav>
          <i className="fas fa-search" />
        </DropdownToggle>
        <DropdownMenu right>
          <Form>
                <FormGroup>
                    <Input  value={this.state.inputVal} onChange={(e) => this.updateValue(e)} bsSize="sm" type="search" name="search" id="exampleSearch" placeholder="search placeholder" />
                </FormGroup>
          </Form>
        </DropdownMenu>
      </UncontrolledDropdown>

    );
  }
}

export default ListFilter;
