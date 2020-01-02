import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.7,
    cheese: 1,
    bacon: 1.3,
    meat: 2
}

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false
};
const addIngredient = (state, action) => {
    return updateObject(state, {
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        building: true
    });
};
const removeIngredient = (state, action) => {
    return updateObject(state, {
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        building: true
    });
};
const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 5,
        error: false,
        building: false
    });
};
const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action)
        case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action)
        case (actionTypes.SET_INGREDIENTS): return setIngredients(state, action)
        case (actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed
        default: return state;
    }
};

export default reducer;
