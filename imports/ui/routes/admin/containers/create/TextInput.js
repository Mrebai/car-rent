import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input,
} from 'reactstrap';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { inputVal: (this.props.defVal)? this.props.defVal : ''};
    this.updateValue = this.updateValue.bind(this);
  }

  // get sources from each child
  componentDidMount() {
      (!this.props.defVal)? this.props.getRef( this.props.source, 'String'):null;
  }

  // update value on change
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

TextInput.propTypes = {
  updateRef: PropTypes.func,
  getRef:PropTypes.func,
};
export default TextInput;
