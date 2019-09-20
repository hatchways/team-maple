import {
  INITIALIZE_SOCKET,
  CLOSE_SOCKET,
  SET_READ_CHAT,
} from "./types";

export const initializeSocket = (token) => {
  return {
    type: INITIALIZE_SOCKET,
    payload: token,
  }
}

export const closeSocket = () => {
  return {
    type: CLOSE_SOCKET,
  }
}

export const sendMessage = body => {
  return {
    type: "message",
    payload: body,
  }
}

export const startConversation = body => {
  return {
    type: "startConversation",
    payload: body,
  }
}

export const setReadChat = body => {
  return {
    type: SET_READ_CHAT,
    payload: body,
  };
}