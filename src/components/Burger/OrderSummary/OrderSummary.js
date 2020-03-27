import React, { Component } from 'react';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] Component is updating');
    }

    render() {
        const ingredientLists = Object.entries(this.props.ingredients).map(([key, value]) => {
            return(
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>
                    {key}
                </span> - {value}</li>);
        });
        return (
            <div>
                <div> Order orderSummary</div>
                <div> Please check the selected items</div>
                <ul>
                    {ingredientLists}
                </ul>
                <p><strong>Total price is {this.props.price}</strong></p>
                <p>Do you want to continue?</p>
                <Button type="Danger" clicked={this.props.cancelPurchasing}>CANCEL</Button>
                <Button type="Success" clicked={this.props.continuePurchasing}>CONTINUE</Button>
            </div>
            );
    }
}

export default OrderSummary;