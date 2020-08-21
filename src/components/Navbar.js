import React from 'react';
import {NavLink} from 'react-router-dom'

export const Navbar = () => (
    <nav className='navbar navbar-expand bg-primary navbar-expand-lg'>
        <NavLink to='/' className='text-dark navbar-brand'>
            Test Fetch
        </NavLink>
        <ul className='navbar-nav'>
            <li className='nav-item '>
                <NavLink exact to='/home' className='nav-link text-white'>Main</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/cocktails' className='nav-link text-white'>Cocktails</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/currency' className='nav-link text-white'>Currency</NavLink>
            </li>
        </ul>
    </nav>
)