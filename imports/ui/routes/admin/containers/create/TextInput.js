import React, { Component } from 'react';
import {
  FormGroup, Label, Input,
} from 'reactstrap';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { inputVal: '' };
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    this.props.getRef( this.props.source, 'String');
  }

  updateValue = (e) => {
    this.setState({inputVal: e.target.value});
    this.props.updateRef(this.props.source,e.target.value)

  };

  render() {
    return (
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" value={this.state.inputVal} onChange={(e) => this.updateValue(e)} name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
    );
  }
}

export default TextInput;
