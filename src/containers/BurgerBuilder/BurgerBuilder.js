import React, { Component } from 'react';
import {connect} from "react-redux";
import Aux from '../../hoc/AuxDiv/AuxCopy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions'


const INGREDIENT_PRICES = {
    salad: 0.7,
    cheese: 1,
    bacon: 1.3,
    meat: 2
}

class BurgerBuilder extends Component {
    state = {
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        // axios.get('https://react-myburger-c854a.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     }).catch(error => {
        //         this.setState({error:true})
        //     })
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

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchase = () => {
        this.setState({ purchasing: false })
    }

    continuePurchase = () => {
       
            const queryParams =[];
            for( let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i)+
                '='+
                encodeURIComponent(this.state.ingredients[i]) )
            }
            queryParams.push('totalPrice=' +this.state.totalPrice)

            const queryString = queryParams.join('&');

            this.props.history.push({
                pathname: "/checkout",
                search: '?'+queryString
            });
    }



    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.state.error ? <p>Oops! something went wrong. Try again later.</p> : <Spinner />
        let orderSummary = null;

        if (this.props.ings ) {
            burger = (
                <Aux>

                    <Burger ingredients={this.props.ings } />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Aux>

            );

            orderSummary = <OrderSummary ingredients={this.props.ings }
                cancel={this.cancelPurchase}
                continue={this.continuePurchase}
                price={this.state.totalPrice}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelOrder={this.cancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateProps = state =>  {
    return{
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => 
        dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) =>
        dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));