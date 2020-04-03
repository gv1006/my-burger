import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
        return(
            <div>
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
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    };
}
export default connect(mapStateToProps)(Checkout);