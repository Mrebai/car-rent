import React from 'react';
import { Table } from 'reactstrap';
import gql from 'graphql-tag';
import { Mutation  } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button, Form} from 'reactstrap';
import {withRouter} from "react-router-dom"

import VerticalMenu from '../../coreUi/VerticalMenu';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    // refs : refernces array from children
    // type : types array from children
    // values : inout values from children
    // mutation and reference convert arrays to mutation
    this.state = {
        refs:[],
        type : [],
        values: [],
        mutation: ``,
        reference: ''
    };
    this.getRef = this.getRef.bind(this);
    this.updateRef = this.updateRef.bind(this);
  }

  componentDidMount(){
     this.setState({ reference: this.props.reference});


  }

  buildMutation = () =>{
      const type2 = this.state.type.join(` `);
      const vars = this.state.values.join(` `);
      const mymutation=
              `
          mutation create${ this.props.reference}(
            ${type2}
          ){
            create${ this.props.reference}(
              ${vars}
            ){
                id
            }
          }
        `

      ;

      return (
          (this.state.type.length > 0 && this.state.values.length > 0 && this.props.reference.length > 0)?
              <Mutation mutation={gql`${mymutation}`}>
                  {(mutation, { data }) => (
                      <div>
                          <Button onClick={() =>{
                              let payload = {};
                              // build mutation vars
                              this.state.refs.forEach(item => payload[item.source]= item.value );
                              mutation({ variables: {...payload} , refetchQueries: [`all${this.props.reference}s`]} ).then(()=> this.props.history.goBack());
                          }
                          } >Submit</Button>
                      </div>
                  )}
              </Mutation>: null
      )
  }

  ;

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
        // update values on change
        const oldRefs = this.state.refs;
        const index = oldRefs.findIndex((item) => item.source === source);
        oldRefs[index].value = val;
        this.setState({ refs: oldRefs });

    };





    render() {
      // pass props to children
        const result = React.Children.map(this.props.children, child => React.cloneElement(child, { getRef:this.getRef, updateRef:this.updateRef }));


    return (
        <div>
            <div>

                <Form>
                    {result}
                    {this.buildMutation()}

                </Form>
            </div>

        </div>



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

  name: 'items',
  page: '1',
  perPage: '10',
  children: null,
};

export default withRouter(SimpleForm);
