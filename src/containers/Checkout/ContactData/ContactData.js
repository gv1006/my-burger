import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state= {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your Name',
                    type: 'text'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your Street',
                    type: 'text'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your City',
                    type: 'text'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your Country',
                    type: 'text'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your E-Mail',
                    type: 'text'
                },
                value: ''
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
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const customerDetails = {};
        for(let [key, data] of Object.entries(this.state.orderForm)) {
            customerDetails[key] = data.value;
        }
        console.log(customerDetails);
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customerDetails: customerDetails
        };
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.props.history.push("/");
            this.setState({
                loading: false
            })
        })
        .catch(error => {
            this.setState({
                loading: false,
                purchasing: false
            })
        });
    }

    inputChangeHandler = (event, id) => {
        const newOrderForm = {
            ...this.state.orderForm
        };
        const newChangedElement = {
            ...newOrderForm[id]
        };
        newChangedElement['value'] = event.target.value;
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
        console.log(formElements);
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement => <Input 
                key={formElement.id} 
                elementType={formElement.configs.elementType}
                elementConfigs={formElement.configs.elementConfigs}
                value={formElement.configs.value}
                changed= {(event) => { this.inputChangeHandler(event, formElement.id); }}/>)}
                <Button type="Success">Order</Button>
            </form>
        );
        if(this.state.loading) {
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

export default withRouter(ContactData);