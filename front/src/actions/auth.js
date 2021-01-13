import axios from 'axios';
import { setAlert } from './alert';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types'
import { useHistory } from 'react-router-dom';

export const login = (email, password)=> async dispatch =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try{
        const response = await axios.post('http://127.0.0.1:8000/api/token/', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload : response.data
        });

        dispatch(setAlert('Connexion réussie', 'success'))
    }
    catch(err){
        dispatch({
            type: LOGIN_FAIL
        });

        dispatch(setAlert('Connexion échouer','error'));
    }
}

export const SignUp = ({name, email, password, password2}) => async dispatch=> {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify(name,email,password,password2);

    try{
        const response =await axios.post('http://127.0.0.1:8000/api/accounts/signup/', body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload : response.data
        })
        dispatch(setAlert('Inscription réussie ', "success"))
        
    }
    catch(err){
        dispatch({
            type: SIGNUP_FAIL
        });

        dispatch(setAlert("Inscription échouer", "error"))
    }
};

export const logout = ({token}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({access_token : token});

    try{
        const response = await axios.post('http://127.0.0.1:8000/api/accounts/logout/blacklist/', body, config);
        dispatch({
            type: LOGOUT,
            payload : response.data
        });

        dispatch(setAlert('Deconnexion Reussi', 'success'))
    }
    catch(err){
        dispatch(
            setAlert('Deconnexion échouer', 'error')
        );
    }
}
