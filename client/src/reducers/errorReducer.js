import { SET_SIGNUP_ERRORS, SET_SIGNUP_SUCCESS, SET_LOGIN_ERRORS } from "../actions/types";

const initialState = {
    login: {},
    signup: {},
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_SIGNUP_ERRORS: {
            const { errorData } = action.payload;
            const message = errorData[0].msg;
            return {
                ...state,
                signup: {
                    status: true,
                    message,
                }
            }
        }
        case SET_SIGNUP_SUCCESS: {
            const message = "Successfully signed up. Redirecting to login page";
            return {
                ...state,
                signup: {
                    status: false,
                    message, 
                }
            }
        }
        case SET_LOGIN_ERRORS: {
            return {
                ...state,
                login: {
                    status: true,
                    message: action.payload.message,
                }
            }
        }
        default:
            return state;
    }
}