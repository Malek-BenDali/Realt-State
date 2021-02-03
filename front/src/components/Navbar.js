import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import Alert from './Alert'
import PropTypes from 'prop-types';

function Navbar({auth : {token, loading} }) {
    const authLinks = (
        <>
        <Link className='navbar__top__auth__link' to='/logout'>Deconnexion</Link>
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
                        <Link className='navbar__top__logo__link' to='/listings'> Logement </Link>
                    </div>
                    <div className='navbar__top__auth'>
                        { !loading && (<> {token ? authLinks : guestLinks} </>)}
                    </div>
                </div>
                <div className='navbar__bottom' >
                    <li className='navbar__bottom__item'>
                        <NavLink className='navbar__bottom__item__link' exact to='/listings'>Liste des logements</NavLink>
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
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps)(Navbar);
