import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={'CheckoutSummary'}>
            <h1>We hope it tastes good!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' action={props.cancelHandler}>CANCEL</Button>
            <Button btnType="Success" action={props.continueHandler}>CONTINUE</Button>
        </div>
    );
}
export default checkoutSummary;