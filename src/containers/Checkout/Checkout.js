import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact');
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                continueHandler={this.checkoutContinueHandler}
                cancelHandler={this.checkoutCancelledHandler}
                />
            </div>
        );
    }
}
export default Checkout;