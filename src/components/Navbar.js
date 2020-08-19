import React from 'react';
import {NavLink} from 'react-router-dom'

export const Navbar = () => (
    <nav className='navbar navbar-expand bg-primary navbar-expand-lg'>
        <div className='navbar-brand'>
            Githab Search
        </div>
        <ul className='navbar-nav'>
            <li className='nav-item '>
                <NavLink exact to='/' className='nav-link text-white'>Main</NavLink>
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