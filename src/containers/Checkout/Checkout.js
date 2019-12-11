import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: null
    }
    UNSAFE_componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice=0;

        for(let param of query.entries()){
            if(param[0] === 'totalPrice'){
                totalPrice = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients, totalPrice})
    }

    checkoutContinueHandler = () =>{
       this.props.history.replace('/checkout/contact-data');
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
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => (
                    <ContactData 
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    {...props}/>
                )}/>
            </div>
        );
    }
}
export default Checkout;