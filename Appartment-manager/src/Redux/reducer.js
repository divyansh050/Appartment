import {LOGIN, LOGOUT, ERROR,FETCHING} from './action';

const initialState = {
    user: null,
    isLoggedIn: false,
    fetching: false,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }
        case FETCHING:
            return {
                ...state,
                fetching: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export  {reducer};

