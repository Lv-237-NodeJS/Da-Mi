import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { About, Address, Home, Contacts, Main, Maps, Signup, Test,
         Gift, Guest, Dashboard, EventDetails } from './containers';
import checkAuth from './helper/redirections';



const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home} onEnter={checkAuth} />
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}>
      <Route path='address' component={Address}/>
      <Route path='maps' component={Maps}/>
    </Route>
    <Route path='signup' component={Signup}/>
    <Route path='test' component={Test}/>
    <Route path='events' component={Dashboard}/>
    <Route path='events/:id' component={EventDetails}>
      <Route path='guests' component={Guest}/>
      <Route path='gifts' component={Gift}/>
    </Route>
  </Route>
);

export default Routes;
