import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/login';
import * as profileActions from '../../redux/profileReducers';
import './profileDropDown.scss';

class ProfileDropDown extends React.Component {

  componentWillMount() {
    this.props.actions.profileActions.retrieveProfile(sessionStorage.getItem('userId'));
  }

  render() {
    const profile = this.props.profile;
    return (
      <div>
        <NavDropdown className='profileDropDown' eventKey={5} id='basic-nav-dropdown'
          title={profile.firstName + ' ' + profile.lastName}>
          <LinkContainer to='/profile'>
            <MenuItem eventKey={5.1}>Edit Profile</MenuItem>
          </LinkContainer>
          <MenuItem eventKey={5.2} onClick={this.props.actions.loginActions.logout}>Log Out</MenuItem>
        </NavDropdown>
        <span> 
          <div className='avatar'> </div>
        </span>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.login.isAuth,
  profile: state.profile.data
});

const mapDispatchToProps = dispatch => ({
  actions:{
    loginActions: bindActionCreators(loginActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  }
});

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileDropDown);
