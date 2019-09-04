import jwtDecode from "jwt-decode";
import { 
    SET_SIGNUP_ERRORS,
    SET_SIGNUP_SUCCESS,
    SET_CURRENT_USER,
    SET_LOGIN_ERRORS,
    USER_LOADING,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import tokenStorage from "../utils/tokenStorage";
import axios from "axios";

export const registerUser = (userData) => async dispatch => {
    try {
        await axios.post("/auth/signup", userData);
        dispatch({ type: SET_SIGNUP_SUCCESS });
    } catch (err) {
        dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: err.response.data,
        })
    }
}

export const loginUser = userData => async dispatch => {
    try {
        const res = await axios.post("/auth/login", userData);
        const { token } = res.data;
        tokenStorage.saveAuthToken(token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: SET_LOGIN_ERRORS,
            payload: err.response.data,
        })
    }
}

export const setCurrentUser = decodedToken => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedToken,
    }
}

export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    }
}

export const logoutUser = () => async dispatch => {
    tokenStorage.deleteAuthToken();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}