import React,{ Component } from 'react'
import Aux from '../../../Aux copy'
import Button from '../../UI/Button/Button'

export default class OrderSummary extends Component {

    render(){
    const ingredientsList = Object.keys(this.props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }} >
                    {igKey}
                </span>
                : {this.props.ingredients[igKey]}
            </li>
        )
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the fallowing ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} action={this.props.cancel}>CANCEL</Button>
            <Button btnType={'Success'} action={this.props.continue} >CONTINUE</Button>
        </Aux>
    )
    }

}

