import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
import isEmptyObject from "../utils/isEmptyObject";

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmptyObject(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}