import React from 'react';
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavgationItems from '../NavigationItems/NavigationItems'
const toolbar = (props) =>(
    <header className={'Toolbar'}>
        <div>
            MENU
        </div>
        <Logo/>
        <nav>
            <NavgationItems/>
        </nav>
    </header>
)
export default toolbar;