import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import Alert from './Alert'
import { logout } from '../actions/auth'
import PropTypes from 'prop-types';

function Navbar({auth : {token, loading}, logout }) {
    const authLinks = (
        <>
        <a className='navbar__top__auth__link' onClick={logout} href='/ajout'>Ajouter un logement</a>
        <a className='navbar__top__auth__link' onClick={logout} href='#!'>logout</a>
        </>
    );

    const guestLinks =(
        <>
            <Link className='navbar__top__auth__link' to='/login'>Connexion</Link>
            <Link className='navbar__top__auth__link' to='/signup'>Inscription</Link>
        </>
    )

    return (
        <>
            <nav className='navbar'>
                <div className="navbar__top">
                    <div className='navbar__top__logo'>
                        <Link className='navbar__top__logo__link' to='/'> Logement </Link>
                    </div>
                    <div className='navbar__top__auth'>
                        { !loading && (<> {token ? authLinks : guestLinks} </>)}
                    </div>
                </div>
                <div className='navbar__bottom' >
                    <li className='navbar__bottom__item'>
                        <NavLink className='navbar__bottom__item__link' exact to='/'>Home</NavLink>
                    </li>
                    <li className='navbar__bottom__item'>
                        <NavLink className='navbar__bottom__item__link' exact to='/listings'>Liste de logements</NavLink>
                    </li>
                    <li className='navbar__bottom__item'>
                        <NavLink className='navbar__bottom__item__link' exact to='/about'>A propos</NavLink>
                    </li>
                    <li className='navbar__bottom__item'>
                        <NavLink className='navbar__bottom__item__link' exact to='/contact'>Contact</NavLink>
                    </li>
                </div>
                <Alert />
            </nav>
        </>
    )
}

Navbar.propTypes={
    logout : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps)(Navbar);
