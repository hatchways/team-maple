import { SET_DEFAULT_IMAGES } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_DEFAULT_IMAGES: {
            return action.payload.data.links;
        }
        default:
            return state;
    }
}