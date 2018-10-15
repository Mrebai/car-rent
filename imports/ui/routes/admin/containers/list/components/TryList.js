import React from 'react';
import TextField from './TextField';
import List from '../index';
import DataTable from '../DataTable';
import EditBtn from './EditBtn';
import DeletBtn from './DeletBtn';

export default TryList = props => (
  <List {...props}>
    <DataTable>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="model" />
      <EditBtn />
      <DeletBtn />
    </DataTable>
  </List>


);
