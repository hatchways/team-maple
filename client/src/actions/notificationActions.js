import axios from "axios";
import { GET_NOTIFICATIONS, SET_READ_NOTIFICATION } from "./types";

export const getNotifications = () => async dispatch => {
  const notifications = await axios.get("/notification");
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: notifications
  });
};

export const setReadNotification = id => {
    return {
      type: SET_READ_NOTIFICATION,
      payload: id
    };
  };
