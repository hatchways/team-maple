import { SET_SOCKET } from "../actions/types";
import * as io from "socket.io-client";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET: {
      const newSocket = io({
        transportOptions: {
          polling: {
            extraHeaders: {
              'authorization': action.payload,
            }
          }
        }
      });
      newSocket.on("error", error => {
        console.log(error);
      })
      newSocket.on("message", body => {
        console.log(body);
      })
      newSocket.on("updateChat", body => {
        console.log(body);
      })
      return newSocket;
    }
    default:
      return state;
  }
}