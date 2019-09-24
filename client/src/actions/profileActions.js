import axios from "axios";
import { SET_PROFILE, CLEAR_PROFILE } from "./types";

export const getProfile = (id) => async dispatch => {
  const payload = await axios.get(`/api/profile/${id}`);
  dispatch({
    type: SET_PROFILE,
    payload: payload.data,
  });
};

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};