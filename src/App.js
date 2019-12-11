import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
export default class App extends Component {
  render() {
    return (
      <div>

        <Layout>

          <Switch>
            <Route exact path='/' component={BugerBuilder} />
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} />
          </Switch>


        </Layout>

      </div>
    );
  }
}


