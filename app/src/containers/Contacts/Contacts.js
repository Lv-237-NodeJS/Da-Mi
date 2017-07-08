import React from 'react';
import { Grid, Row, Col, PageHeader, FormGroup, FormControl, Button,
  Form, HelpBlock  } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from '../../redux/contactInfo';
import { Maps, Message  } from '../../components';
import { CONTACTDATA, messages }  from '../../helper';
import './Contacts.scss';

const FieldGroup = ({className, isErrors, id, ...props}) => (
  <Col xs={12} sm={12} md={12}>
    <div>
      <FormGroup className = {className} id = {id}>
        <FormControl {...props} />
        {isErrors && <HelpBlock>{isErrors}</HelpBlock>}
        <FormControl.Feedback />
      </FormGroup>
    </div>
  </Col>
);

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      surname: '',
      textarea: '',
      isErrors: {
        email: null,
        textarea: null
      },
      enableButton: false
    };
  }

  handleChange = param => e => {
    let value = e.target.value;
    this.setState({[param]: value},
      () => {this.validateField(param);});
  };

  validateField = param => {
    const pattern = {
      email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
      textarea: /.{4,}/
    };
    const newState = this.state;
    const validateByPattern = name => {
      newState.isErrors[name] = !newState[name].match(pattern[name]) && 
      messages[name + 'Error'] || '';
    };

    validateByPattern(param) && newState.isErrors[param] !== null;

    newState.enableButton = Object.keys(newState.isErrors).map(key => 
      newState.isErrors[key]).every(element => element === '' );
    this.setState(newState);
  };

  cleanForm = e => {
    this.setState({
      email: '',
      name: '',
      surname: '',
      textarea: ''
    });
  };
  
  handleButtonClick = e => {
    e.preventDefault();
    this.cleanForm();
    this.state.enableButton = false;
    this.props.actions.contactInfo(this.state);
  };

  render() {
    const inputsName = {
      name: 'Name',
      surname: 'Surname',
      email: 'Email',
      textarea: 'Textarea'
    };
    
    return (
      <Grid>
        <Message />
        <PageHeader className='text-center'>Contacts us</PageHeader>
        <Row className='show-grid'>
          <Col xs={12} sm={12} md={12} className='text-center'>
            <h2>Da-Mi</h2>
          </Col>
        </Row>
        <Row className='contact'>
          <Col xs={6} sm={6} md={6} className='text-right'>
            <div className='mainText'> 
              {[CONTACTDATA.MANADGER1, CONTACTDATA.MANADGER2,
                CONTACTDATA.POST, CONTACTDATA.ADDRESS].map(key =>
                <p key={key}>{key}</p>
              )}
            </div>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <div>
              {[CONTACTDATA.PHONE1, CONTACTDATA.PHONE2,
                CONTACTDATA.MAIL].map(key =>
                (key==CONTACTDATA.MAIL) && (<p key={key}>
                  <span className='glyphicon glyphicon-envelope' />{key}</p>) ||
              (<p key={key}><span className='glyphicon glyphicon-phone' />{key}</p>)
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6}>
            <Form onSubmit={this.handleButtonClick}>
              { Object.keys(inputsName).map(param =>
                <FieldGroup
                  id={param}
                  key={param}
                  className={!!this.state.isErrors[param] && 'has-error'}
                  label={inputsName[param]}
                  type={param === 'email' && param || 'text'}
                  name={param}
                  isErrors={this.state.isErrors[param]}
                  onChange={this.handleChange(param)}
                  value={this.state[param]}
                  placeholder={inputsName[param]}
                  componentClass={param === 'textarea' && param || 'input'} />
              )}
              <Col xs={12} sm={12} md={12} className='text-center'> 
                <Button
                  className='btn btn-primary'
                  type='submit'
                  disabled = {!this.state.enableButton}>Send message
                </Button>
              </Col>
            </Form>
          </Col>
          <Col xs={12} sm={6} md={6} className='map'>
            <Maps />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStatetoProps = state => ({
  contactInfo: state.contactInfo
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Contacts);
