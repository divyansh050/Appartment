const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";


const loginReq = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}

const logoutReq = () => {
    return {
        type: LOGOUT
    }
}

export { logoutReq, loginReq, LOGIN, LOGOUT };