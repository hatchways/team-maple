import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      console.log("payload", action.payload);
      return action.payload.data.notifications;
      
    case UPDATE_NOTIFICATIONS:
        console.log('updating notification');
        console.log('notifications reducer', action.payload.notification);
        return [
            ...state,
            action.payload.notification
        ]

    default:
      return state;
  }
};
