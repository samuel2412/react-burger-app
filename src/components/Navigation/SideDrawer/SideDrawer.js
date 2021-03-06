import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/AuxDiv/AuxCopy';
const sideDrawer = (props) => {

    return (
        <Aux>
        <Backdrop show={props.show} clicked={props.close}/>
        <div className={`SideDrawer ${props.show ? 'Open' : 'Close'} `} onClick={props.close}>
           
                <Logo height={'11%'} bottom={'32px'}/>
           
            <nav>
                <NavigationItems isAuth={props.isAuthenticated}/>
            </nav>
        </div>
        </Aux>
    );
}
export default sideDrawer