export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';

export const DECREMENT = 'DECREMENT';

export const doLogIn = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};