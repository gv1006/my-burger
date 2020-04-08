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

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        purchaseBurgerStart();
        axios.post('/orders.json?auth=' + token, orderData)
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

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
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

