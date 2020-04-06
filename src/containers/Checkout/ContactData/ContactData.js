import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler';
import * as actionCreators from '../../../store/actions/index';

class ContactData extends Component {
    state= {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your Name',
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your Street',
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your City',
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your Country',
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your E-Mail',
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            orderType: {
                elementType: 'select',
                elementConfigs: {
                    options: [
                        {value: 'cheapest', displayName: 'Cheapest'}, 
                        {value:'fastest', displayName: 'Fastest'}]
                },
                value: 'fastest'
            }
        },
        loading: false
    }

    isElementValid = (value, rules) => {
        if(!rules) {
            return true;
        }
        let isValid = false;
        if(rules.required) {
            isValid = value.trim() !== '';
        }
        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const customerDetails = {};
        for(let [key, data] of Object.entries(this.state.orderForm)) {
            customerDetails[key] = data.value;
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            customerDetails: customerDetails
        };
        this.props.onPurchaseStart(order);
    }

    inputChangeHandler = (event, id) => {
        const newOrderForm = {
            ...this.state.orderForm
        };
        const newChangedElement = {
            ...newOrderForm[id]
        };
        newChangedElement['value'] = event.target.value;
        newChangedElement.isValid = this.isElementValid(newChangedElement.value, newChangedElement.validation);
        newChangedElement.touched = true;
        newOrderForm[id] = newChangedElement;
        this.setState({
            orderForm: newOrderForm
        });
    }

    render() {
        let formElements = [];
        for(let [key, value] of Object.entries(this.state.orderForm)) {
            formElements.push({
                id: key,
                configs: value
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement => <Input 
                key={formElement.id} 
                elementType={formElement.configs.elementType}
                elementConfigs={formElement.configs.elementConfigs}
                value={formElement.configs.value}
                invalid={!formElement.configs.isValid}
                shouldValidate={formElement.configs.validation}
                touched={formElement.configs.touched}
                changed= {(event) => { this.inputChangeHandler(event, formElement.id); }}/>)}
                <Button type="Success">Order</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        return(
            <div className="ContactData">
                <h4>Enter your details here</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
})

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchaseStart: (orderData) =>  {
            dispatch(actionCreators.purchaseBurger(orderData));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));