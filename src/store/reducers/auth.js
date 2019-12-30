import * as actionTypes from '../actions/actionTypes';

const initialState= {
    tokenId:null,
    userId:null,
    error:null,
    loading:false
};
 const reducer = (state=initialState,action) =>{

    switch(action.type){
        case(actionTypes.AUTH_START) :
        return{
            ...state,
            loading:true,
            error:null
        }
        case(actionTypes.AUTH_SUCCESS) :
        return{
            ...state,
            userId: action.userId,
            tokenId: action.tokenId,
            loading: false
        }
        case(actionTypes.AUTH_FAIL) :
        return{
            ...state,
            error: action.error,
            loading: false
        }
        default: return state;
    }

 }

 export default reducer;