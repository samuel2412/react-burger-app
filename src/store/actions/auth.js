import axios from 'axios';
import * as actionTypes from './actionTypes';

export const checkAuthTime = (expirationTime) =>{
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000 )
    }
}

export const auth = (email,password,isSignup) =>{
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken:true
        }
        const apiKey = 'AIzaSyCKH7HZpd7lriYuf1LJVIeeZoxOML0R4f8';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= ${apiKey}`
        if(!isSignup){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        }
        axios.post(url,authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.localId, response.data.idToken));
            dispatch(checkAuthTime(response.data.expiresIn))
        })
        .catch(err =>{
            console.log(err.response);
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userId,tokenId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        tokenId
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    return{
       type: actionTypes.AUTH_LOGOUT 
    }
}

export const authRedirectPath = (path) => {
    return{
        type: actionTypes.AUTH_REDIRECT_PATH,
        path
    }
}