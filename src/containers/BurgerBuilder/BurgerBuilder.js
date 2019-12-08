import React, { Component } from 'react'
import Aux from '../../Aux copy'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice: 5
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = updatedCount;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

        this.setState({ ingredients: updateIngredients, totalPrice: newPrice });

    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedCount = this.state.ingredients[type] - 1;
            console.log(updatedCount)
            const updateIngredients = { ...this.state.ingredients };
            updateIngredients[type] = updatedCount;

            const newPrice = INGREDIENT_PRICES[type] - this.state.totalPrice;

            this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
        }
    }



    render() {
        const disabledInfo ={  ...this.state.ingredients };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}/>
            </Aux>
        );
    }
}