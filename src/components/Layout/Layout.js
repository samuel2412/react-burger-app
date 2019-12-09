import React, { Component } from 'react';
import Aux from '../../Aux copy';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css';

export default class Layout extends Component {
    state ={
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () =>{
       this.setState((prevState) =>{
            return{showSideDrawer: !prevState.showSideDrawer}
       });
    }

    render() {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer show={this.state.showSideDrawer} close={this.sideDrawerToggleHandler}/>
                <main className={'Content'}>
                    {this.props.children}
                </main>
            </Aux>

        );
    }
}