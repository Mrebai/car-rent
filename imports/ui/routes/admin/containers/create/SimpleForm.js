import React from 'react';
import { Table } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button, Form} from 'reactstrap';

import VerticalMenu from '../../coreUi/VerticalMenu';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        refs:[],
        type : [],
        values: [],
        mutation: ``,
        reference: this.props.reference
    };
    this.getRef = this.getRef.bind(this);
    this.updateRef = this.updateRef.bind(this);
  }

  componentDidMount(){

  }

  buildQuery = () => {



      console.log(this.state.mutation)
  };

    getRef = ( source, type) => {
        // setup refs
        const oldRefs = this.state.refs;
        const newRef = {source : source,type: type};
        oldRefs.push(newRef);

        // setup types
        const oldType = this.state.type ;
        oldType.push(`$${source}:${type}\n`);

        // setup values
        const oldValues = this.state.values ;
        oldValues.push(`${source}:$${source}\n`);


        this.setState({ refs: oldRefs, type:oldType, values:oldValues });

    };

    updateRef = (source , val) => {
        const oldRefs = this.state.refs;
        const index = oldRefs.findIndex((item) => item.source === source);
        oldRefs[index].value = val;
        this.setState({ refs: oldRefs });
        console.log( this.state.type )
    };

    submitForm = () => {

    };
    render() {
        const result = React.Children.map(this.props.children, child => React.cloneElement(child, { getRef:this.getRef, updateRef:this.updateRef }));
        const type = this.state.type.join(` `);
        const vars = this.state.values.join(` `);
        const mutation = `
          mutation create${this.props.reference}(
            ${type}
          ){
            create${this.props.reference}(
              ${vars}
            )
          }
        `
        ;


    return (
        <Form >

            {
                result
            }
            {
               console.log(mutation)
            }
            <Button onClick={() => this.submitForm()}>Submit</Button>
        </Form>

    );
  }
}

SimpleForm.propTypes = {
  reference: PropTypes.string,
  name: PropTypes.string,
  page: PropTypes.string,
  perPage: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

SimpleForm.defaultProps = {
  reference:'',
  name: 'items',
  page: '1',
  perPage: '10',
  children: null,
};

export default SimpleForm;
