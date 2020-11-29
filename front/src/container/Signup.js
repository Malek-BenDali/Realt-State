import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAlert } from '../actions/alert';
import { SignUp } from '../actions/auth';
import { PropTypes } from 'prop-types';

function Signup({setAlert, SignUp, isAuthenticated }) {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    });

    const { name, email, password, password2 } = formData;

    const onSubmit = e =>{
        e.preventDefault();
        if(password === password2){
            SignUp(name,email,password,password2)
        }
        else{
            setAlert('Les mots de passe ne sont pas identique')
        }
    }

    const onChange = e => setFormData({
        ...formData,
        [e.target.name] : [e.target.value]
    })

    if (isAuthenticated)
        return <Redirect to='/login' />

    return (
        <div className='auth' >
            <Helmet>
                <title> Inscription </title>
                <meta
                    name='description'
                    content='Inscription'
                />
            </Helmet>
            <h1 className='auth__title' >Inscription</h1>
            <p className='auth__lead'> Inscripez vous maintenan sur la meilleur plateform de logement </p>
            <form onSubmit={e => onSubmit(e)}>
            <div className='auth__form__group' >
                    <input 
                    className='auth__form__input' 
                    type='text' 
                    placeholder='name' 
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required />
                </div>
                <div className='auth__form__group' >
                    <input 
                    className='auth__form__input' 
                    type='email' 
                    placeholder='email' 
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required />
                </div>
                <div className='auth__form__group' >
                    <input 
                    className='auth__form__input' 
                    type='password' 
                    placeholder='******' 
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    minLength='6'
                    required />
                </div>
                <div className='auth__form__group' >
                    <input 
                    className='auth__form__input' 
                    type='password2' 
                    placeholder='******' 
                    name='password2'
                    value={password2}
                    onChange={e => onChange(e)}
                    minLength='6'
                    required />
                </div>
                <button className='auth__form__button'> m'inscrire </button>
            </form>
            <p className='auth__authtext'>
                Vous n'avez pas un compte ? 
                 <Link className='auth__authtext__link' to='/signup'>
                     Inscripez-vous 
                 </Link> maintenan!
                 
            </p>
        </div>
    )
}

SignUp.propTypes= {
    setAlert : PropTypes.func.isRequired,
    SignUp : PropTypes.func.isRequired ,  
    isAuthenticated : PropTypes.bool
}

const mapStateToProps = state=> ({
    isAuthenticcated : state.auth.isAuthenticated
})

export default  connect(mapStateToProps,{setAlert,SignUp}) (Signup)
