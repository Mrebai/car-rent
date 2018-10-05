import React from 'react';
import { Table } from 'reactstrap';
import gql from 'graphql-tag';
import { Mutation,Query  } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button, Form} from 'reactstrap';

import VerticalMenu from '../../coreUi/VerticalMenu';

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        refs:[],
        type : [`$id:ID`],
        values: [`id:$id`],
        queryValues:[],
        mutation: ``,
        reference: ''
    };
    this.getRef = this.getRef.bind(this);
    this.updateRef = this.updateRef.bind(this);
  }

  componentDidMount(){
     this.setState({ reference: this.props.reference});
  }
    buildQuery = () => {
        const vars = this.state.queryValues.join(` `);
        const query = ` query ${this.props.reference}($id: ID!){
                        ${this.props.reference}(id:$id){
                        ${vars}
                        }}`;


        return (
            (this.state.type.length > 0 && this.state.queryValues.length > 0 && this.props.reference.length > 0)?
            <Query query={gql`${query}`}  variables={{ id:this.props.match.params.id }}>
                {({loading, error, data}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                       <div>
                           {console.log(data)}

                           {React.Children.map(this.props.children, child => React.cloneElement(child, { getRef:this.getRef, updateRef:this.updateRef ,defVal:data[this.props.reference][child.props.source]}))}
                       </div>
                    );
                }}
            </Query>: <div> </div>
        )
    }
;

    buildMutation = () =>{
      const types = this.state.type.join(` `);
      const vars = this.state.values.join(` `);
      const myMutation=
              `
          mutation update${ this.props.reference}(
            ${types}
          ){
            update${ this.props.reference}(
              ${vars}
            ){
                id  
            }
          }
        `

      ;

      return (
          (this.state.type.length > 0 && this.state.values.length > 0 && this.props.reference.length > 0)?
              <Mutation mutation={gql`${myMutation}`}>
                  {(mutation, { data }) => (
                      <div>
                          <Button onClick={() =>{
                              let payload = {};
                              this.state.refs.forEach(item => payload[item.source]= item.value );
                              console.log(this.state.refs);
                              mutation({ variables: {...payload , id:this.props.match.params.id} });
                          }
                          }> Submit </Button>
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

        // setup queryValues
        const oldQueryValues = this.state.queryValues ;
        oldQueryValues.push(`${source}\n`);



        this.setState({ refs: oldRefs, type:oldType, values:oldValues ,queryValues:oldQueryValues });

    };

    updateRef = (source , val) => {
        const oldRefs = this.state.refs;
        const index = oldRefs.findIndex((item) => item.source === source);
        oldRefs[index].value = val;
        this.setState({ refs: oldRefs });

    };

    render() {
    const result = React.Children.map(this.props.children, child => React.cloneElement(child, { getRef:this.getRef, updateRef:this.updateRef }));
    return (
        <div>
            <div>

                <Form>
                    <div style={{display:'none'}}>
                        {result}
                    </div>
                    {this.buildQuery()}
                    {this.buildMutation()}
                </Form>
            </div>

        </div>



    );
  }
}

UpdateForm.propTypes = {
  reference: PropTypes.string,
  name: PropTypes.string,
  page: PropTypes.string,
  perPage: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

UpdateForm.defaultProps = {

  name: 'items',
  page: '1',
  perPage: '10',
  children: null,
};

export default UpdateForm;
