import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];
const buildControls = (props) => {
    return(
        <div className='BuildControls'>
            <p>Total price is - <strong>{props.totalPrice}</strong></p>
            { controls.map(control => {
                return <BuildControl 
                key={control.label} 
                label={control.label} 
                added={() => {props.added(control.type);}}
                removed={() => {props.removed(control.type);}}
                disabled={props.disabled[control.type]}
                />
            })}
            <button 
                className='OrderButton' 
                disabled={!props.purchaseable} 
                onClick={props.onOrderNowClick}>
                    {props.isAuth ? 'ORDER' : 'SIGNUP TO ORDER' }
            </button>
        </div>
    );
}

export default buildControls;
