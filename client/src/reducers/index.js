import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import defaultImagesReducer from "./defaultImagesReducer";
import profileReducer from "./profileReducer";
import chatReducer from "./chatReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    defaultImages: defaultImagesReducer,
    profile: profileReducer,
    chat: chatReducer,
    socket: socketReducer,
});