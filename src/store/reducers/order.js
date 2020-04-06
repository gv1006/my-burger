import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

export const reducer = (state=initialState, actions) => {
    switch(actions.type) {
        case actionTypes.PURCHASE_BURGER_INIT:
            return updateObject(state, {
                purchased: false
            });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const orders = updateObject(actions.orderData, {
                id: actions.orderId,
            }); 
            return updateObject(state, {
                orders: state.orders.concat(orders),
                loading: false,
                purchased: true
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {
                loading: false
            });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {
                loading: true
            });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: actions.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {
                loading: false
            });
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {
                loading: true
            });
        default:
            return state;
    }
};

export default reducer;