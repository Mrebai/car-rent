import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DeleteBtn = ({ id, name, reference }) => {
  deleteMutation = () => {
    const mutationVars = `
      mutation delete${reference} ($id: ID!) {
          delete${reference}(id:$id) {
              id
          }
      }
  `;
    return (
      <Mutation mutation={gql`${mutationVars}`}>
        {(del, { data }) => (
          <Fragment>
            <td>
              <Button onClick={() => del({ variables: { id }, refetchQueries: [`all${reference}` ] })}>
                <span className="fas fa-eraser" />
              </Button>
            </td>
          </Fragment>
        )}
      </Mutation>
    );
  };
  return (
    <Fragment>
      {
        deleteMutation()
      }
    </Fragment>
  );
};

export default DeleteBtn;
