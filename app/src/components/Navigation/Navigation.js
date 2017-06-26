import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/Login';
import style from './Navigation.scss';

class Navigation extends React.Component {

  componentWillMount() {
    this.props.actions.checkToken();
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1
    }
    this.handleSelect = this.handleSelect.bind(this);
  };

  handleSelect(selectedKey) {
    this.setState({activeKey: selectedKey});
  };
  
  render() {
    return (
      <div>
        <Navbar>
          <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect}>
            <LinkContainer to='/events'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/about'>
              <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
            <LinkContainer to='/contacts'>
              <NavItem eventKey={3}>Contacts</NavItem>
            </LinkContainer>
            <LinkContainer to='/test'>
              <NavItem eventKey={4}>Test</NavItem>
            </LinkContainer>
          </Nav>
          {this.props.isAuth &&
            <Button className='pull-right'
              type='button'
              onClick={this.props.actions.logout}>Log out</Button>
          }
        </Navbar>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.login.isAuth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Navigation);
