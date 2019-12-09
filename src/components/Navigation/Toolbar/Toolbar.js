import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavgationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={'Toolbar'}>
            <DrawerToggle clicked={props.openSideDrawer}/>
       
            <Logo height={'80%'} />
       
        <nav className={'DesktopOnly'}>
            <NavgationItems />
        </nav>
    </header>
)
export default toolbar;