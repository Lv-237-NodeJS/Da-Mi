import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { About, Address, Home, Contacts, Main, Maps,
  Gift, Guest, Dashboard, EventDetails, Profile } from './containers';
import checkAuth from './helper/redirections';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home} onEnter={checkAuth} />
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}>
      <Route path='address' component={Address}/>
      <Route path='maps' component={Maps}/>
    </Route>
    <Route path='events' component={Dashboard}/>
    <Route path='events/:id' component={EventDetails}>
      <Route path='guests' component={Guest}/>
      <Route path='gifts' component={Gift}/>
    </Route>
    <Route path='profile' component={Profile}/>
  </Route>
);

export default Routes;
