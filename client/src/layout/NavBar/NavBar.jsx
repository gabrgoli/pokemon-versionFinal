import React from 'react'
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
 
const NavBar = () => {
  return (
    <header>
        <div className='header-container'>
            <img classNamer="header__logo" src={ logo } alt="" />

            <ul>
                <li>
                    <Link to="/"> Inicio </Link>    
                </li>
            </ul>    

        </div>
    </header>
  )
}

export default NavBar