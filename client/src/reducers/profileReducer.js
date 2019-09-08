import { SET_PROFILE, CLEAR_PROFILE } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_PROFILE: {
            return action.payload;
        }
        case CLEAR_PROFILE:
          return {};
        default:
            return state;
    }
}