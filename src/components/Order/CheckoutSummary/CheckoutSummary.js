import React from 'react';
import Burger from '../../Burger/Burger';
import MyButton from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return(
        <div>
            <h2>Hope you are enjoying this!!!</h2>
            <Burger ingredients={props.ingredients} /> 
            <div className="ButtonContainer">
                <MyButton type="Success" clicked={props.onContinueClick}>continue</MyButton>
                <MyButton type="Danger" clicked={props.onCancelClick}>Cancel</MyButton>
            </div>
        </div>
    );
}

export default checkoutSummary;