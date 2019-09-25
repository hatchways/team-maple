import jwtDecode from "jwt-decode";
import axios from "axios";
import {
  SET_SIGNUP_ERRORS,
  SET_SIGNUP_SUCCESS,
  CLEAR_SIGNUP_ERRORS,
  SET_CURRENT_USER,
  SET_LOGIN_ERRORS,
  CLEAR_LOGIN_ERRORS,
  USER_LOADING
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import tokenStorage from "../utils/tokenStorage";
import { getProfile, clearProfile } from "./profileActions";
import { getConversations } from "./conversationActions";
import { initializeSocket, closeSocket } from "./socketActions";
import { getNotifications } from "./notificationActions";

export const registerUser = userData => {
  return async dispatch => {
    try {
      await axios.post("/auth/signup", userData);
      dispatch({ type: SET_SIGNUP_SUCCESS });
    } catch (err) {
      dispatch({
        type: SET_SIGNUP_ERRORS,
        payload: err.response.data
      });
    }
  };
};

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/auth/login", userData);
    const { token, userId } = res.data;
    tokenStorage.saveAuthToken(token);
    localStorage.setItem("userId", userId);
    setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch(setCurrentUser(decoded));
    dispatch(getProfile(decoded.userId));
    dispatch(getConversations(decoded.userId));
    dispatch(initializeSocket(token));
    dispatch(getNotifications());
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_LOGIN_ERRORS,
      payload: err.response.data
    });
  }
};

export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = history => async dispatch => {
  tokenStorage.deleteAuthToken();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(clearProfile());
  dispatch(closeSocket());
  if (history) {
    history.push("/login");
  }
};

export const clearLoginErrors = () => {
  return {
    type: CLEAR_LOGIN_ERRORS
  };
};

export const clearSignupErrors = () => {
  return {
    type: CLEAR_SIGNUP_ERRORS
  };
};
