import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import setAuthToken from "../utils/setAuthToken";
import tokenStorage from "../utils/tokenStorage";
import { decode } from "punycode";

export const registerUser = (userData, history) => async dispatch => {
    try {
        const res = await axios.post("/users/register");
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
        const res = await axios.post("/users/login");
        const { token } = res.data;
        tokenStorage.saveAuthToken(token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
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