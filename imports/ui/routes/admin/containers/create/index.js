import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateNav from "./createNav";


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { source: [] , refs:[] };

  }

  componentDidMount() {
    React.Children.forEach(this.props.children, (element) => {
      if (!React.isValidElement(element)) return;
      const { source } = element.props;
      const oldSource = this.state.source;
      oldSource.push(source);
      this.setState({ source: oldSource });
    });
  }


  render() {
    const children = React.Children.map(this.props.children, (child) => React.cloneElement(child, {name: this.props.name, reference:this.props.reference, match: this.props.match }));
    return (
      <div>
        <CreateNav title={this.props.title} />
        {
                    children
                }

      </div>
    );
  }
}

Create.propTypes = {
  name: PropTypes.string,
  reference: PropTypes.string,
  match: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Create.defaultProps = {
  reference: '',
  children: null,
};

export default Create;
