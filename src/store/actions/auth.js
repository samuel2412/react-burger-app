import * as actionTypes from './actionTypes';


export const auth = (email,password) =>{
    return dispatch => {
        dispatch(authStart())
    }
}

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}