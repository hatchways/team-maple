import { SET_CURRENT_CHAT } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_CHAT: {
            return action.payload;
        }
        default:
            return state;
    }
}