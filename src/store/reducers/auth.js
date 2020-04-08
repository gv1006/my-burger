import * as actionTypes from'../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    idToken: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
};

const authSuccess = (state, actions) => {
    return updateObject(state, {
        userId: actions.userId,
        idToken: actions.idToken,
        loading: false,
        error: null
    });
};

const authStart = (state, actions) => {
    console.log('authStqart');
    return updateObject(state, {
        loading: true
    });
};

const authFail = (state, actions) => {
    return updateObject(state, {
        loading: actions.error
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        idToken: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
};

const reducer = (state=initialState, actions) => {
    switch(actions.type) {
        case actionTypes.AUTH_SUCCESS: 
            return authSuccess(state, actions);
        case actionTypes.AUTH_START:
            return authStart(state, actions);
        case actionTypes.AUTH_FAIL:
            return authFail(state, actions);
        case actionTypes.AUTH_LOGOUT: 
            return authLogout(state, actions);
        case actionTypes.SET_AUTH_DIRECT_PATH:
             return setAuthRedirectPath(state, actions);
        default:
            return state;
    }
};

export default reducer;