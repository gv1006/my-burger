import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler';
import * as actionCreators from '../../../store/actions/index';

class Orders extends Component {
    
    componentDidMount() {
        console.log(this.props);
        console.log('toekn', this.props.token);
        console.log('userId', this.props.userId);
        this.props.startFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = this.props.orders.map(order => <Order 
            key={order.id} 
            ingredients={order.ingredients} 
            price={order.totalPrice} />);
        if(this.props.loading) {
            orders = <Spinner />;
        }
        return(
            <div style={{position: 'relative', top:'35px'}}>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrder(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));