import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import setAuthToken from "../utils/setAuthToken";
import tokenStorage from "../utils/tokenStorage";
import axios from "axios";

export const registerUser = (userData, history) => async dispatch => {
    try {
        await axios.post("/auth/signup", userData);
        history.push("/login");
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        })
    }
}

export const loginUser = userData => async dispatch => {
    try {
        const res = await axios.post("/auth/login", userData);
        const { token, userId } = res.data;
        tokenStorage.saveAuthToken(token);
        localStorage.setItem('userId', userId);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
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