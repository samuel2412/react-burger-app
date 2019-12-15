import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
}

export const puchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const puchaseBurger = (orderData) => {
    return dispatch =>{
        dispatch(puchaseBurgerStart())
        axios.post('/orders.json', orderData)
        .then(response => {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    }
}