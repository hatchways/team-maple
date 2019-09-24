import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSocketMiddleware from "./sockets/createSocketMiddleware";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk, createSocketMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware)
    ),
);

export default store;