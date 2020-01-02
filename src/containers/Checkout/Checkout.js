import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {


    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const redirectPurchased = this.props.purchased ? <Redirect to='/' /> : null; 
            summary = (
                <div>
                    {redirectPurchased}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        continueHandler={this.checkoutContinueHandler}
                        cancelHandler={this.checkoutCancelledHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    };
}


export default connect(mapStateToProps)(Checkout);