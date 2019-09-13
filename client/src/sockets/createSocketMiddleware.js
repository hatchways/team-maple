import * as io from "socket.io-client";
import {
  INITIALIZE_SOCKET,
  UPDATE_CHAT,
  CLOSE_SOCKET,
  UPDATE_CONVERSATION,
  SET_CURRENT_CHAT,
  UPDATE_ONLINE_STATUS,
  ALL_ONLINE_STATUS,
} from "../actions/types";

const createSocketMiddleware = () => {
  let socket;
  return store => next => action => {
    switch(action.type) {
      case INITIALIZE_SOCKET: {
        socket = io({
          transportOptions: {
            polling: {
              extraHeaders: {
                'authorization': action.payload,
              }
            }
          }
        });

        socket.on("error", error => {
          console.log("Error received from server: ", error);
        })
        socket.on("message", body => {
          console.log(body);
        })
        socket.on("updateChat", body => {
          store.dispatch({
            type: UPDATE_CHAT,
            payload: body,
          });
        });
        socket.on("updateConversation", body => {
          store.dispatch({
            type: UPDATE_CONVERSATION,
            payload: body,
          })
          if (body.starter) {
            store.dispatch({
              type: SET_CURRENT_CHAT,
              payload: body.body.id,
            });
          }
        });
        socket.on("statusUpdate", body => {
          store.dispatch({
            type: UPDATE_ONLINE_STATUS,
            payload: body,
          });
        });
        socket.on("allOnline", body => {
          store.dispatch({
            type: ALL_ONLINE_STATUS,
            payload: body,
          });
        });
        return;
      }
      case CLOSE_SOCKET: {
        socket.close();
        return;
      }
      case "message": {
        socket.emit("message", action.payload, (error) => {
          console.log("ERROR from message: " + error);
        });
        return;
      }
      case "startConversation": {
        socket.emit("startConversation", action.payload, (error) => {
          if (error.conversationId) {
            store.dispatch({
              type: SET_CURRENT_CHAT,
              payload: error.conversationId,
            });
          };
        })
        return;
      }
      default: {
        return next(action);
      }
    }
  }
};
export default createSocketMiddleware();