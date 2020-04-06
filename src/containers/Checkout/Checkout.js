import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    onContinueClick = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    onCancelClick = () => {
        console.log(this.props);
        this.props.history.goBack();
    }


    render() {
        let summary = (<Redirect to='/' />);
        if(this.props.ings) {
            let redirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {redirect}
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    onContinueClick={this.onContinueClick}
                    onCancelClick={this.onCancelClick}/>
                <Route 
                path={this.props.match.path + "/contact-data"} 
                component = { ContactData } />
            </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}
export default connect(mapStateToProps)(Checkout);