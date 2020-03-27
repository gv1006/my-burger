import React from 'react';

import './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    const ingredientsArray = Object.entries(props.ingredients);
    let transformedIngredients = ingredientsArray.map(([key, value]) => {
        let ingredientsCount = value;
        const outputArray = [];
        for(let i=1; i <= ingredientsCount; i++ ) {
            outputArray.push(<BurgerIngredients ingredients={key} key={key+i}/>);
        }
        return outputArray;
    }).reduce((arr, el) =>{
        return arr.concat(el);
    }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!!!</p>
    }
    return (
    <div className='burger'>
        <BurgerIngredients ingredients='bread-top' />
        { transformedIngredients }
        <BurgerIngredients ingredients='bread-bottom' />
    </div>
    );
}

export default burger;
