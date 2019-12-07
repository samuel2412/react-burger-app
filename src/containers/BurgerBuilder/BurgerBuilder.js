import React, { Component } from 'react'
import Aux from '../../Aux copy'
import Burger from '../../components/Burger/Burger'

export default class BurgerBuilder extends Component {

    render() {
        return (
            <Aux>
                <Burger />
            </Aux>
        );
    }
}