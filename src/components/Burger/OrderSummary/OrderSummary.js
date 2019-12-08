import React from 'react'
import Aux from '../../../Aux copy'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientsList = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform:"capitalize" }} >
                    {igKey}
                </span>
                : {props.ingredients[igKey]}
            </li>
        )
    })

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the fallowing ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} action={props.cancel}>CANCEL</Button>
            <Button btnType={'Success'} action={props.continue} >CONTINUE</Button>
        </Aux>
    )

}

export default orderSummary;