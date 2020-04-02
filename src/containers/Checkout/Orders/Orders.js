import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            console.log(res.data);
            const orders = [];
            for(let [key, value] of Object.entries(res.data)) {
                orders.push({
                    ...value,
                    id: key
                });
            }
            this.setState({
                loading: false,
                orders: orders
            });
        })
        .catch(err => console.log(err));
    }
    render() {
        let orders = this.state.orders.map(order => <Order 
            key={order.id} 
            ingredients={order.ingredients} 
            price={order.ingredients.price} />);
        if(this.state.loading) {
            orders = <Spinner />;
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);