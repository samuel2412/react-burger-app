import React, { Component } from 'react';
import {connect} from "react-redux";
import Aux from '../../hoc/AuxDiv/AuxCopy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }
    componentDidMount() {
        this.props.onInitIngredients();
    }
        
        updatePurchaseState(ingredients) {

            const sum = Object.keys(ingredients).map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0 
        }
        
    purchaseHandler = () => {
            this.setState({ purchasing: true })
    }

    cancelPurchase = () => {
        this.setState({ purchasing: false })
    }

    continuePurchase = () => {
            this.props.onInitPurchased();
            this.props.history.push("/checkout");
    }



    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error ? <p>Oops! something went wrong. Try again later.</p> : <Spinner />
        let orderSummary = null;

        if (this.props.ings ) {
            burger = (
                <Aux>

                    <Burger ingredients={this.props.ings } />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}
                    />
                </Aux>

            );

            orderSummary = <OrderSummary ingredients={this.props.ings }
                cancel={this.cancelPurchase}
                continue={this.continuePurchase}
                price={this.props.totalPrice}
            />
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

const mapStateToProps = state =>  {
    return{
        ings: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => 
        dispatch(actions.addIngredient(ingName)),
        
        onIngredientRemoved: (ingName) =>
        dispatch(actions.removeIngredient(ingName)),
        
        onInitIngredients: () =>
        dispatch(actions.initIngredients()),
        
        onInitPurchased: () => 
        dispatch(actions.purchaseInit())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));