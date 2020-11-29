import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import PropTypes from 'prop-types';

function Login({ login, isAuthenticated  }) {
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    const { email, password } = formData

    const onChange = e => setFormData({
        ...formData, 
        [e.target.name] : e.target.value
    })

    const onSubmit = e => {
        e.preventDefault();
        login(email,password);
    }

    if (isAuthenticated)
        return <Redirect to='/'/>
    

    return (
        <div className='auth' >
            <Helmet>
                <title> Connexion </title>
                <meta
                    name='description'
                    content='connexion'
                />
            </Helmet>
            <h1 className='auth__title' >Connexion</h1>
            <p className='auth__lead'> Connectez-vous sur votre plateform preferer </p>
            <form onSubmit={e => onSubmit(e)}>
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
                    placeholder='Mot De Passe' 
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    minLength='6'
                    required />
                </div>
                <button className='auth__form__button'>Login</button>
            </form>
            <p className='auth__authtext'>
                Vous n'avez pas un compte ?
                 <Link className='auth__authtext__link' to='/signup'>
                    Inscripez-vous
                 </Link>
                 maintenan!
            </p>
        </div>
    )
}

login.protoTypes = {
    login : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login}) (Login)
