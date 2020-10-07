import { 
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED,
    USER_LOADING, 
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    fetch('/api/auth/user', configHeader(getState))
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => dispatch({
                type: USER_LOADED,
                payload: data,
            }))
        } else {
            console.log(res)
        }
    })
    .catch(err => console.log(err));
}

export const login = (username, password) => dispatch => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    };

    fetch('/api/auth/login', config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            }))
        } else {
            dispatch({
                type: LOGIN_FAILED
            })
        }
    })
    .catch(err => console.log(err));
}

export const register = (username, email, password) => dispatch => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username, email, password
        }),
    }

    fetch('/api/auth/register', config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: data
                })
            })
        } else {
            console.log(res);
        }
    })
    .catch(err => console.log(err));
}


export const logout = () => (dispatch, getState) => {
    const config = configHeader(getState, 'POST');
    fetch('/api/auth/logout', config)
    .then(res => {
        if (res.status < 400) {
            dispatch({ type: LOGOUT_SUCCESS })
        } else {
            console.log(res);
        }
    })
    .catch(err => console.log(err));
}

export const configHeader = (getState, method='GET') => {
    const token = getState().auth.token;
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}