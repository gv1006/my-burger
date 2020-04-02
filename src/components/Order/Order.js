import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let [key, val] of Object.entries(props.ingredients)) {
        ingredients.push({name: key, value: val})
    }
    const ingredientsOutput = ingredients.map(ing => 
    <span 
    style={{margin: '0 12px', border: '1px solid gray', padding: '5px'}}
    key={ing.name}>{ing.name}({ing.value})</span>);
    return(
        <div className="Order">
            Ingredients: {ingredientsOutput}
            <p>TotalPrice: <strong>INR {props.price}</strong></p>
        </div>
    )
}

export default order;