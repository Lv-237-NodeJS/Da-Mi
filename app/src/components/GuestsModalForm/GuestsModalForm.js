import React from 'react';
import { Button, Form, FormGroup, Col, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as inviteActions from 'src/redux/inviteReducers';

const ListItemButton = ({...props}) => (
  <Button
    type='button'
    {...props}
    className={`modal-btn modal-input glyphicon glyphicon-${props.className}`}
    bsStyle={(props.className === 'trash' || props.className === 'remove') &&
            'danger' || 'success'}>
  </Button>
);

const ModalInput = ({...props}) => (
  <input
    {...props}
    type='email'
    placeholder='Enter Email'
    className='modal-input form-control' />
);

class GuestsModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      inputs: [],
      initialEmail: '',
      key: null
    };
  };
  
  handleClickOutside = e => {
    !e.target.className.includes('modal-list') &&
    e.target.parentNode.className !== 'btn-toolbar' && this.setState({key: null});
  };

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
  
  appendEmail = () => {
    this.state.email &&
      this.setState({
        inputs: [...this.state.inputs, this.state.email],
        email: ''
      });
  };
  
  setEmail = e => {
    this.setState({email: e.target.value});
  };

  handleChange = index => e => {
    const newEmails = this.state.inputs.map((email, emailIndex) => (
      index !== emailIndex ? email: e.target.value
    ));
    
    this.setState({inputs: newEmails});
  };
  
  focusInput = index => () => {
    this.setState({
      initialEmail: this.state.inputs[index],
      key: index
    });
    this[index].focus();
  };

  deleteEmail = index => () => {
    this.setState({
      inputs: this.state.inputs.filter((email, emailIndex) => index !== emailIndex)
    });
  };
<<<<<<< 7bcdd5eaf77486d22f08dae063d0ccced2c7df36

  acceptEdition = () => {
    this.setState({key: null});
  };

  discardEdition = index => () => {
    const newState = this.state;
    newState.inputs[index] = this.state.initialEmail;
    newState.key = null;
    this.setState(newState);
  };
=======
>>>>>>> make some change in files

  handleSubmit = e => {
    e.preventDefault();
    const {actions, eventId, closeModal} = this.props;
    actions.saveEmails(this.state.inputs, eventId);
    this.setState({inputs: []});
    closeModal();
  };
<<<<<<< 7bcdd5eaf77486d22f08dae063d0ccced2c7df36

  render() {
    const checkEditingItem = index => this.state.key == index && true || false;
    const getButtonsSet = index => ({
      default: {
        pencil: this.focusInput(index),
        trash: this.deleteEmail(index)
      },
      edit: {
        ok: this.acceptEdition,
        remove: this.discardEdition(index)
      }
    });
    const selectButtons = index => 
      checkEditingItem(index) && getButtonsSet(index).edit || getButtonsSet(index).default;
=======
>>>>>>> make some change in files

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Col xs={12} xsOffset={0} smOffset={1} sm={11}>
          <FormGroup>
            <Col xs={10}>
              <ModalInput
                value={this.state.email}
                onChange={this.setEmail} />
            </Col>
            <Col xs={2}>
<<<<<<< 7bcdd5eaf77486d22f08dae063d0ccced2c7df36
              <ListItemButton
                onClick={this.appendEmail}
                className='ok' />
=======
              <ListButton
                onClick={this.addEmail}
                className='plus' />
>>>>>>> make some change in files
            </Col>
          </FormGroup>
          
          {this.state.inputs.map((email, index) =>
            <FormGroup key={index}>
              <Col xs={8} sm={9}>
                <input
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  className='modal-input modal-list form-control'
                  ref={input => this[index] = input}
<<<<<<< 7bcdd5eaf77486d22f08dae063d0ccced2c7df36
                  onChange={this.handleChange(index)}
                  onClick={this.focusInput(index)} />
=======
                  onChange={this.handleChange(index)} />
>>>>>>> make some change in files
              </Col>
              <Col xs={4} sm={3} className='listItemBar'>
                <ButtonToolbar>
                  {Object.keys(selectButtons(index)).map(param =>
                    <ListItemButton
                      key={param}
<<<<<<< 7bcdd5eaf77486d22f08dae063d0ccced2c7df36
                      onClick={selectButtons(index)[param]}
=======
                      onClick={param === 'pencil' && this.focusInput(index) ||
                        this.deleteEmail(index)}
>>>>>>> make some change in files
                      className={param} />
                  )}
                </ButtonToolbar>
              </Col>
            </FormGroup>
          )}
          <Col xsOffset={4}>
            <Button
              type='submit'
              bsStyle='primary'
              bsSize='large'>Save</Button>
          </Col>
        </Col>
      </Form>
    );
  }
}

const mapStatetoProps = state => ({
  guests: state.invite.guests
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(inviteActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(GuestsModalForm);
