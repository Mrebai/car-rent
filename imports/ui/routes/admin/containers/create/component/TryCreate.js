import React from 'react';
import TextInput from '../TextInput';
import Create from '../index';
import SimpleForm from '../SimpleForm';

export default TryCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="model" />
    </SimpleForm>
  </Create>


);
