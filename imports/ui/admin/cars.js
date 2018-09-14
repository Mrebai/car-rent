import React from 'react';


import {
  List, Edit, Create, FileField, ImageInputPreview, BooleanInput, SelectInput, FileInput, ArrayInput, DeleteButton, Datagrid, NumberInput, TextField, required, EditButton, SimpleFormIterator, DisabledInput, ImageInput, ImageField, SimpleForm, TextInput, TabbedForm, FormTab,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const carsList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const onDrop = (files) => {
  console.log('im here');
  // Push all the axios request promise into a single array
  const uploaders = files.map((file) => {
    // Initial FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', 'codeinfuse, medium, gist');
    formData.append('upload_preset', 'x7ne7zx3'); // Replace the preset name with your own
    formData.append('api_key', '192597396342249'); // Replace API key with your own Cloudinary key
    formData.append('timestamp', (Date.now() / 1000) | 0);

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post('https://api.cloudinary.com/v1_1/codeinfuse/image/upload', formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    }).then((response) => {
      const data = response.data;


      console.log(data);
    });
  });
};

export const carsEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="summary">
        <DisabledInput label="Id" source="id" />
        <TextInput source="name" validate={required()} />
        <TextInput source="model" validate={required()} />
        <NumberInput source="price" step={100} validate={required()} />
        <NumberInput source="passengers" step={1} validate={required()} />
        <NumberInput source="luggages" step={1} validate={required()} />
        <SelectInput
          source="category"
          choices={[
            { id: 'manual', name: 'Manual' },
            { id: 'auto', name: 'Auto' },
            { id: 'hybrid', name: 'Hybrid' },
          ]}
        />
        <BooleanInput label="Available Now" source="available" />
      </FormTab>
      <FormTab label="description">
        <RichTextInput source="description" validate={required()} addLabel={false} />
      </FormTab>
      <FormTab label="Includes">
        <ArrayInput source="includes">
          <SimpleFormIterator>
            <TextInput />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="Images">
        <ImageInput source="images" label="Pictures" accept="image/*" options={{ onRemove: () => console.log(this.state) }}>
          <ImageField source="src" title="title" />

        </ImageInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const carsCreate = props => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="summary">
        <DisabledInput label="Id" source="id" />
        <TextInput source="name" validate={required()} />
        <TextInput source="model" validate={required()} />
        <NumberInput source="price" step={100} validate={required()} />
        <NumberInput source="passengers" step={1} validate={required()} />
        <NumberInput source="luggages" step={1} validate={required()} />
        <SelectInput
          source="category"
          choices={[
            { id: 'manual', name: 'Manual' },
            { id: 'auto', name: 'Auto' },
            { id: 'hybrid', name: 'Hybrid' },
          ]}
        />
        <BooleanInput label="Available Now" source="available" />
      </FormTab>
      <FormTab label="Includes">
        <ArrayInput source="includes">
          <SimpleFormIterator>
            <TextInput />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="Images">
        <FileInput source="files" label="Pictures" accept="image/*" onDrop={onDrop}>
          <FileField source="src" title="title" />
        </FileInput>
      </FormTab>
    </TabbedForm>
  </Create>
);
