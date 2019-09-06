import { 
    SET_SIGNUP_ERRORS,
    SET_SIGNUP_SUCCESS,
    SET_LOGIN_ERRORS,
    CLEAR_LOGIN_ERRORS,
    CLEAR_SIGNUP_ERRORS,
} from "../actions/types";

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
                    status: "error",
                    message,
                }
            }
        }
        case SET_SIGNUP_SUCCESS: {
            const message = "Successfully signed up. Redirecting to login page";
            return {
                ...state,
                signup: {
                    status: "success",
                    message, 
                }
            }
        }
        case SET_LOGIN_ERRORS: {
            return {
                ...state,
                login: {
                    status: "error",
                    message: action.payload.message,
                }
            }
        }
        case CLEAR_LOGIN_ERRORS: {
            return {
                ...state,
                login: {}
            }
        }
        case CLEAR_SIGNUP_ERRORS: {
            return {
                ...state,
                signup: {}
            }
        }
        default:
            return state;
    }
}