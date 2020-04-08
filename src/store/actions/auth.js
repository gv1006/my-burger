import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: idToken
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    console.log('auth Logout called');
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimer = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
};
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        console.log(isSignup);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdG6aoBdm-XNc5zkeOV-ExQcmuflY9OBo';
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdG6aoBdm-XNc5zkeOV-ExQcmuflY9OBo';
        }
        axios.post(url, authData)
        .then(response => {
            localStorage.setItem('idToken', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            console.log(response.data.expiresIn);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data.localId, response.data.idToken));
            dispatch(checkAuthTimer(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_DIRECT_PATH,
        path: path
    };
};

export const checkAuthToken = () =>{
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        if(idToken) {
            const expiresIn = new Date(localStorage.getItem('expirationTime'));
            if(expiresIn <= new Date()) {
                return dispatch(authLogout());
            }
            console.log(expiresIn);
            console.log(expiresIn.getSeconds());

            const newExpiresIn = expiresIn.getTime() - new Date().getTime();
            console.log(newExpiresIn);
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(userId, idToken));
            dispatch(checkAuthTimer(newExpiresIn/1000));
        }
        else {
            dispatch(authLogout());
        }
    };
};