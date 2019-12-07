import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css'

const Burger = (props) => {
    return (
        <div className={"Burger"}>
            <BurgerIngredient type={'bread-top'} />
            <BurgerIngredient type={'bacon'} />
            <BurgerIngredient type={'bacon'} />
            <BurgerIngredient type={'cheese'} />
            <BurgerIngredient type={'meat'} />
            <BurgerIngredient type={'bread-bottom'} />
        </div>

    );

}
export default Burger;