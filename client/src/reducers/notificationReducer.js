import { GET_NOTIFICATIONS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      console.log("payload", action.payload);
      return action.payload.data.notifications;
      

    default:
      return state;
  }
};
