import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.7,
    cheese: 1,
    bacon: 1.3,
    meat: 2
}

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                }

            } 
        case(actionTypes.REMOVE_INGREDIENT):
        return{
            ...state,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName]-1
            }
        }
        case(actionTypes.SET_INGREDIENTS):
        return{
            ...state,
            ingredients: action.ingredients,
            error: false
        }
        case(actionTypes.FETC_INGREDIENTS_FAILED):
        return{
            ...state,
            error: true
        }

        default:
            return state;
    }
};

export default reducer;
