import {
  SET_SOCKET
} from "./types";

export const initializeSocket = (token) => {
  return {
    type: SET_SOCKET,
    payload: token,
  }
}