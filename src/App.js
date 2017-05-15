import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Route, IndexRoute, Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store';


import {
  Dashboard,
  Customers,
  CustomersEdit,
} from './containers/index';

require('./app.scss');

const history = syncHistoryWithStore(hashHistory, store);

let App = ({children}) => {

  return (
    <div>
      <Navbar inverse={true}>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem>Dashboard</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/customers">
            <NavItem>Customers</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
          <Route path="/customers" component={Customers} />
          <Route path="/customers/new" component={CustomersEdit} />
          <Route path="/customers/:customerId" component={CustomersEdit} />
        </Route>
      </Router>
    </Provider>
  )
}
