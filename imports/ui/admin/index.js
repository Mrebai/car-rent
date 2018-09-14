import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Resource, Admin } from 'react-admin';
import { carsList, carsCreate, carsEdit } from './cars';

class AdminIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { data } = this.props;
    return (
      <Admin dataProvider={data}>
        <Resource name="Car" list={carsList} create={carsCreate} edit={carsEdit} />
      </Admin>
    );
  }
}

export default AdminIndex;
