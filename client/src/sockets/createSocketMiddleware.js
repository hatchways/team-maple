import * as io from "socket.io-client";
import {
  INITIALIZE_SOCKET,
  UPDATE_CHAT,
  CLOSE_SOCKET,
  UPDATE_CONVERSATION,
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
          console.log(body);
          store.dispatch({
            type: UPDATE_CONVERSATION,
            payload: body,
          })
        })
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
          console.log("Error from conversation: " + error);
        })
      }
      default: {
        return next(action);
      }
    }
  }
};
export default createSocketMiddleware();