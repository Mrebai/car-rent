
import React from 'react';
import TextInput from '../../create/TextInput';
import Update from '../index';
import UpdateForm from '../UpdateForm';

export default TryUpdate = props => (
  <Update {...props}>
    <UpdateForm>
      <TextInput source="name" />
      <TextInput source="model" />
    </UpdateForm>
  </Update>


);
