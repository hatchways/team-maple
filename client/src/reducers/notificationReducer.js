import {
  GET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.payload.data.notifications;

    case ADD_NOTIFICATIONS:
      return [...state, action.payload.notification];
    case UPDATE_NOTIFICATIONS:
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
