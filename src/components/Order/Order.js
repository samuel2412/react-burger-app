import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientsOutput = ingredients.map(igKey =>{
        return <span
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin: '0 8px',
                border:'1px solid #cccccc',
                padding:'5px'
            }}
        >{igKey.name} ({igKey.amount})</span>
    })
    return (
        <div className={'Order'}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Total price: <strong>USD {Number.parseFloat( props.price ).toFixed(2)} </strong></p>
        </div>
    );
}
export default order;