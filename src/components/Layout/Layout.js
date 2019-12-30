import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/AuxDiv/AuxCopy';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css';

class Layout extends Component {
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
                <Toolbar isAuthenticated={this.props.isAuthenticated}
                openSideDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer isAuthenticated={this.props.isAuthenticated}
                show={this.state.showSideDrawer} close={this.sideDrawerToggleHandler}/>
                <main className={'Content'}>
                    {this.props.children}
                </main>
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.authReducer.tokenId !== null
    };
}

export default connect(mapStateToProps)(Layout);