import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css'

const Burger = (props) => {

    let transformedIndredients = Object.keys( props.ingredients ).map(igKey =>{
        return [...Array( props.ingredients[igKey] )].map(( _,index) => {
            return <BurgerIngredient key={igKey + index} type={igKey}/>;
        })
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);
   
    if(transformedIndredients.length === 0){
        transformedIndredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={"Burger"}>
            <BurgerIngredient type={'bread-top'} />
                { transformedIndredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>

    );

}
export default Burger;