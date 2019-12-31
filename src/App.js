import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    this.props.onAutoTryLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route exact path='/' component={BugerBuilder} />
        <Redirect to='/' />
      </Switch>

    );
    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={Checkout} />
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

