import { UPDATE_ONLINE_STATUS, ALL_ONLINE_STATUS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch(action.type) {
    case ALL_ONLINE_STATUS: {
      const { online } = action.payload;
      return online.reduce((prev, curr) => {
        return {
          ...prev,
          [curr]: "online",
        }
      }, {});
    }
    case UPDATE_ONLINE_STATUS: {
      const { user, status } = action.payload;
      if (status === "offline") {
        // take user property of state and move it to "remove" object, keep others
        const { [user]: remove, ...others } = state;
        return others;
      } else {
        return {
          ...state,
          [user]: status
        }
      }
    }
    default:
        return state;
  }
}