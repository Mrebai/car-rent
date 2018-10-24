import React from 'react';
import { Table } from 'reactstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'

import ListPagination from './Pagination';


class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variable: [],
      queryVars: ``,

    };
  }

  componentDidMount() {
    // get the source props from children and map them to state
    React.Children.forEach(this.props.children, (element) => {
      if (!React.isValidElement(element) ) return;
      const { source } = element.props;
      if(source){
        const oldsState = this.state.variable;
        oldsState.push(source);
        this.setState({ variable: oldsState });
      }
    });

      // construct the query vars in the state
      let stringVars = '';
      this.state.variable.forEach(item => stringVars += `${item} \n`);
      this.setState({ queryVars: stringVars });

  }

    res = () => (
        (this.props.reference && this.state.queryVars.length >0)?
            <Query query={
                gql` query  ${`all${this.props.reference}s`}($page: Int,$perPage:Int,$q:String){
                  ${`all${this.props.reference}s`}(page:$page,perPage:$perPage, q:$q){
                  ${this.state.queryVars}
              }}`} variables={{ page: parseInt(this.props.match.params.page-1) || 0, perPage: parseInt(this.props.match.params.perPage) || 10, q:this.props.q }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div>
                            <Table size="sm" hover responsive>
                                <thead>
                                <tr>
                                    {
                                        this.state.variable.map((item, i) => (
                                            <th key={i}>
                                                {item}
                                            </th>
                                        ))
                                    }
                                </tr>
                                </thead>

                                <tbody>
                                {
                                  // pass data to children
                                    (data[`all${this.props.reference}s`].map((data,key) => {
                                        const result = React.Children.map(this.props.children, child => React.cloneElement(child, { data: data[child.props.source], id:data.id, name:this.props.name, reference:this.props.reference}));
                                        return (
                                            <tr key={data.id || key}>
                                                {result}
                                            </tr>
                                        );
                                    }))
                                }
                                </tbody>
                            </Table>
                            <ListPagination name={this.props.name} reference={this.props.reference}  page={parseInt(this.props.match.params.page)} perPage={parseInt(this.props.match.params.perPage)}   />
                        </div>
                    );
                }}
            </Query>:null
    );

  render() {
    return (
        <div>
            {
                this.res()
            }

        </div>

    );
  }
}

DataTable.propTypes = {
    name: PropTypes.string,
    page: PropTypes.string,
    perPage: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

DataTable.defaultProps = {
    name:'items',
    page: '1',
    perPage: '10',
    children: null
};

export default withRouter(DataTable)