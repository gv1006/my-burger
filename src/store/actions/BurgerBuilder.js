import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredient: ingredient
    };
};

export const removeIngredients = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredient: ingredient
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const setFetchIngredientsError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILURE,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-a78ed.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data));
        })
        .catch(error => {
            dispatch(setFetchIngredientsError());
        })
    };
};