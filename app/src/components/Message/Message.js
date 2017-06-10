import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from '../../redux/Signup';
import style from './Message.scss';

class Message extends React.Component {
  hide = () =>{
    this.props.actions.showModal(false);
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.hide}
        id="modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            <p>{this.props.message}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.hide} id="modButton">Close</Button>
        </Modal.Footer>      
      </Modal>
    );
  } 
}

const mapStatetoProps = (state, ownProps) => {
  return {
    message: state.signup.message,
    show: state.signup.show  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(showActions, dispatch)
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Message);
