import React from 'react';
import TextField from './TextField';
import List from '../index';
import DataTable from '../DataTable';

export default TryList = () => (
  <List>
    <DataTable>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="age" />
    </DataTable>
  </List>


);
