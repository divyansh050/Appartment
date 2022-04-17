import {LOGIN, LOGOUT} from './action';

const initialState = {
    user: null,
    isLoggedIn: false
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
        default:
            return state;
    }
}

export  {reducer};

