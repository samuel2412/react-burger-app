import React, { Component } from 'react';
import Aux from '../../Aux copy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.7,
    cheese: 1,
    bacon: 1.3,
    meat: 2
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable:false,
        purchasing: false,
        loading: false
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updateIngredients);

    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedCount = this.state.ingredients[type] - 1;
           
            const updateIngredients = { ...this.state.ingredients };
            updateIngredients[type] = updatedCount;

            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

            this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
            this.updatePurchaseState(updateIngredients);
        }
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys( ingredients ).map(igKey =>{
            return ingredients[igKey]
            }).reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }
    
    cancelPurchase = () => {
        this.setState({purchasing: false})
    }

    continuePurchase = () => {
        this.setState({loading: true})
        const order={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            deliveryMethod: 'fastest',
            customer:{
                name:'Samuel',
                email: 'teste@teste',
                address:{
                    street: 'Avenida Paulista',
                    zipCode: '01311-936',
                    country: 'Brasil'
                }
            }
        }
        axios.post('/orders.json',order)
            .then(response => 
                this.setState({loading: false, purchasing: false})
                )
            .catch(error => 
                
                this.setState({loading: false, purchasing: false})
                )
               
    }



    render() {        
        const disabledInfo ={  ...this.state.ingredients };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
        cancel={this.cancelPurchase}
        continue={this.continuePurchase}
        price={this.state.totalPrice}
        />

        if(this.state.loading){
            console.log('entrou')
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelOrder={this.cancelPurchase}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}