import axios from 'axios';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const FETCHING = "FETCHING";
export const ERROR = "ERROR";


// action creator

export const loginReq = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}

export const logoutReq = () => {
    return {
        type: LOGOUT
    }
}

export const fetching = (payload) => {
    return {
        type: FETCHING,
        payload
    }
}

export const error = (payload) => {
    return {
        type: ERROR,
        payload
    }
}

// async action creator

export const login = (values,navigate) => async dispatch => {
    dispatch(fetching(true));
    try {
        const res = await axios.post(
          "https://apartment-manager-server.herokuapp.com/login",
            values
        );
        dispatch(loginReq(res.data));
        dispatch(fetching(false));
        navigate("/");
    } catch (err) {
        dispatch(error(err.message));
        dispatch(fetching(false));
    }
    
}