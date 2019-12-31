import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
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
    return (
      <div>

        <Layout>

          <Switch>
            <Route exact path='/' component={BugerBuilder} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Route path='/logout' component={Logout} />
            <Route path='/checkout' component={Checkout} />
          </Switch>


        </Layout>

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoTryLogin: () =>
      dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(null, mapDispatchToProps)(App));

