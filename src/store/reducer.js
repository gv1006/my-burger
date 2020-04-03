import * as actionTypes from './actions';


const INGREDIENTS_PRICE = {
    salad: 1.5,
    bacon: 2.6,
    meat: 3.4,
    cheese: 1.5
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    totalPrice: 4,
};

const reducer=(state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            console.log('removing');
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredient]
            }
        default:
            return state;
    }
}

export default reducer;