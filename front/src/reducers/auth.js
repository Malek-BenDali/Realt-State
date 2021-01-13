import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null ,
    loading : false
};

export default function(state = initialState,action){
    const { type , payload } = action;

    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access);
            return{
                ...state,
                isAuthenticated: true,
                loading : false,
                token : payload.access
            };break;
        
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated: false,
                loading: true
            };break;
        case LOGOUT:
            localStorage.removeItem('token', payload.access);
            return {
                ...state,
                isAuthenticated: false,
                loading : false,
                token : null
            }
        default:
            return state;
    }
}