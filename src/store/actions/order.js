import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseSuccess = (orderData, orderId) => {
    return({
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    });
};

export const purchaseFail = (error) => {
    return({
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    });
};

export const purchaseBurgerStart = () => {
    return ({
        type: actionTypes.PURCHASE_BURGER_START
    });
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        purchaseBurgerStart();
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response);
            const orderData1 = orderData;
            const orderId = response.data.name;
            dispatch(purchaseSuccess(orderData1, orderId));
        })
        .catch(error => {
            console.log(error);
            dispatch(purchaseFail(error.message));
        });
    };
};

export const purchaseBurgerInit = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_INIT
    };
};


export const fetchOrderSuccess = (orders) => {
    return({
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    });
};

export const fetchOrderFail = (error) => {
    return({
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    });
};

export const fetchOrderStart = () => {
    return ({
        type: actionTypes.FETCH_ORDERS_START
    });
};

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
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
            dispatch(fetchOrderSuccess(orders));
            
        })
        .catch(err => dispatch(fetchOrderFail(err)));
    }
}

