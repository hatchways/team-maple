import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import defaultImagesReducer from "./defaultImagesReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    defaultImages: defaultImagesReducer,
    profile: profileReducer,
});