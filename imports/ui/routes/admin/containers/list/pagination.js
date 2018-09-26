import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, FormGroup,  Container, Row, Col , Input} from 'reactstrap';
import {Query} from 'react-apollo'
import gql from 'graphql-tag';

import { Link,withRouter} from 'react-router-dom';
import VerticalMenu from '../../coreUi/VerticalMenu';

class ListPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value : this.props.perPage
    }
  };
  changeOpt = (event) => {
      this.props.history.push(`/admin/${this.props.name}/${this.props.page}/${event.target.value}`);
      this.setState({value: event.target.value});

  };

  itemsMete = () =>
  <Query query={
      gql` query allQuery($page: Int,$perPage:Int){
                  ${`_all${this.props.reference}sMeta`}(page:$page,perPage:$perPage){
                  count
              }}`}
         >
      {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const count = data[`_all${this.props.reference}sMeta`].count;
          const pages = Math.ceil(count/this.props.perPage);

          const checkPage = (page) =>
              (page <= pages)?
                  <PaginationItem>
                  <Link className="page-link" to={`${`/admin/${this.props.name}/${page}`}/${this.props.perPage}`}>{page}</Link>
                 </PaginationItem>: null
          ;

          const checkPageNeg = (page) =>
              (page >= 1)?
                  <PaginationItem>
                      <Link className="page-link" to={`${`/admin/${this.props.name}/${page}`}/${this.props.perPage}`}>{page}</Link>
                  </PaginationItem>: null
          ;

          return (
              <div className="">

                          <Container>
                                  <Row>
                                      <Col xs="9">
                                          <Pagination aria-label="Page navigation example">

                                              {

                                                  // prev Btn
                                                  (!this.props.page || this.props.page == 1) ?
                                                      <PaginationItem disabled>
                                                          <Link className="page-link" to={`${`/admin/${this.props.name}/${this.props.page - 1}`}/${this.props.perPage}`}>Prev</Link>
                                                      </PaginationItem>:
                                                      <PaginationItem >
                                                          <Link className="page-link" to={`${`/admin/${this.props.name}/${this.props.page - 1}`}/${this.props.perPage}`}>Prev</Link>
                                                      </PaginationItem>
                                              }
                                              {
                                                  checkPageNeg(this.props.page - 1 )
                                              }
                                              {
                                                  checkPage(this.props.page)
                                              }
                                              {
                                                  checkPage(this.props.page + 1)
                                              }
                                              {
                                                  checkPage(this.props.page + 2)
                                              }
                                              {
                                                  checkPage(this.props.page + 3)
                                              }
                                          <FormGroup>

                                              <Input type="select" onChange={this.changeOpt} value={this.state.value} name="select" id="exampleSelect">
                                                  <option>5</option>
                                                  <option >10</option>
                                                  <option>15</option>
                                                  <option>20</option>
                                                  <option>50</option>
                                              </Input>
                                          </FormGroup>
                                          </Pagination>
                                      </Col>
                                      <Col>
                                          <div className={'page-item'} style={{display:"flex" , justifyContent:' flex-end'}}> <p>{"page " + this.props.page + "/" + Math.ceil(count/this.props.perPage)}</p> </div>
                                      </Col>
                                  </Row>
                          </Container>
              </div>
          );
      }}
  </Query>;



  render() {
    return (
        <Fragment>
            {this.itemsMete()}
        </Fragment>

    )
  }
}


VerticalMenu.propTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
  perPage: PropTypes.number,
};

VerticalMenu.defaultProps = {
  page: 1,
  perPage: 10,
};


export default withRouter(ListPagination);
