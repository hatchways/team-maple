import {
    SET_CURRENT_CHAT,
    ON_CHAT_PAGE,
    OFF_CHAT_PAGE,
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_CHAT: {
            return {
                ...state,
                id: action.payload,
            }
        }
        case ON_CHAT_PAGE: {
            return {
                ...state,
                onPage: true,
            }
        }
        case OFF_CHAT_PAGE: {
            return {
                ...state,
                onPage: false,
            }
        }
        default:
            return state;
    }
}