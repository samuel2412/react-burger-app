import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoTryLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route exact path='/' component={BugerBuilder} />
        <Redirect to='/' />
      </Switch>

    );
    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route exact path="/" component={BugerBuilder} />
          <Redirect to="/" />
        </Switch>

      );
    }

    return (
      <div>

        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.tokenId !== null
  }

}
const mapDispatchToProps = dispatch => {
  return {
    onAutoTryLogin: () =>
      dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

