import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }
    componentWillMount() {
        let urlSearchParams = new URLSearchParams(this.props.location.search), price = 0;
        let latestIngredients = {};
        for(let [key, value] of urlSearchParams) {
            if(key === 'price') {
                price = value;
            }
            latestIngredients[key] = +value;
        }
        this.setState({ingredients: latestIngredients, totalPrice: price});
    }
    onContinueClick = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    onCancelClick = () => {
        console.log(this.props);
        this.props.history.goBack();
    }


    render() {
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    onContinueClick={this.onContinueClick}
                    onCancelClick={this.onCancelClick}/>
                <Route 
                path={this.props.match.path + "/contact-data"} 
                render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>} />
            </div>
        );
    }
}

export default Checkout;