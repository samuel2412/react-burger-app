import axios from 'axios';
import * as actionTypes from './actionTypes';


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
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err));
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