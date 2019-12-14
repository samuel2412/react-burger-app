import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.7,
    cheese: 1,
    bacon: 1.3,
    meat: 2
}

const initialState = {
    ingredients: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice: 5,
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

        default:
            return state;
    }
};

export default reducer;
