import axios from "axios";
import { GET_NOTIFICATIONS, SET_READ_NOTIFICATION } from "./types";

export const getNotifications = () => async dispatch => {
  console.log("im here in get notifications");
  const notifications = await axios.get("/notification");
  console.log(notifications);
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: notifications
  });
};

export const setReadNotification = id => {
    console.log('in the setReadNotification action', id);
    return {
      type: SET_READ_NOTIFICATION,
      payload: id
    };
  };
