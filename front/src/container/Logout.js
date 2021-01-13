import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

function Logout({ logout }) {
    const token = localStorage.getItem('token');
    logout(token)

    return (
        <Redirect to='/login'/>
    )
}

Logout.protoTypes = {
    logout : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout}) (Logout)
