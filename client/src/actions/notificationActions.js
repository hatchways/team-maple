import axios from "axios";
import { GET_NOTIFICATIONS } from "./types";

export const getNotifications = () => async dispatch => {
  console.log("im here in get notifications");
  const notifications = await axios.get("/notification");
  console.log(notifications);
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: notifications
  });
};

