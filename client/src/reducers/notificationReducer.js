import {
  GET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      console.log("payload", action.payload);
      return action.payload.data.notifications;

    case ADD_NOTIFICATIONS:
      console.log("notifications reducer", action.payload.notification);
      return [...state, action.payload.notification];
    case UPDATE_NOTIFICATIONS:
      console.log("updating notification", action.payload);
      return state.map(notification => {
        if (notification._id === action.payload) {
          return { ...notification, read: true };
        } else {
            return notification;
        }
      });

    default:
      return state;
  }
};
