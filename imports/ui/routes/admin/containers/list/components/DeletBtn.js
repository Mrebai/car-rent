import React, { Fragment,Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

class DeleteBtn extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  deleteMutation = () => {
    const mutationVars = `
      mutation delete${this.props.reference} ($id: ID!) {
          delete${this.props.reference}(id:$id) {
              id
          }
      }
  `;
    return (
      <Mutation mutation={gql`${mutationVars}`}>
        {(del, { data }) => (
          <Fragment>
            <td>
              <Button onClick={this.toggle}>
                <span className="fas fa-eraser" />
              </Button>
            </td>

            {/*confirmation modal*/}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Are you sure you want to delete this item?</ModalHeader>
              <ModalFooter>
                <Button color="danger" onClick={() => {
                  del({ variables: { id:this.props.id }, refetchQueries: [`all${this.props.reference}s`] });
                  this.toggle()}}>Delete</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Fragment>
        )}
      </Mutation>
    );
  };
  render(){
    return (
      <Fragment>
        {
          this.deleteMutation()
        }
      </Fragment>
    );
  }
};

DeleteBtn.propTypes = {

};
export default DeleteBtn;
