import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENTS_PRICE = {
    salad: 1.5,
    bacon: 2.6,
    meat: 3.4,
    cheese: 1.5
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredients = (state, action) => {
    const updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            return updateObject(state, {
                ingredients: updatedIngredients, 
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredient] 
            });
};

const removeIngredients = (state, action)  => {
    const updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            return updateObject(state, {
                ingredients: updatedIngredients, 
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredient] 
            });
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4
    }); 
};

const fetchIngredientsFailure = (state, action) => {
    return updateObject(state, {
        error: true
    });
}
const reducer=(state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredients(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILURE:
            return fetchIngredientsFailure(state, action);
        default:
            return state;
    }
}

export default reducer;