import {
  INITIALIZE_SOCKET,
  CLOSE_SOCKET,
  NOTIFICATION_NEW_SUBMISSION
} from "./types";

export const initializeSocket = token => {
  return {
    type: INITIALIZE_SOCKET,
    payload: token
  };
};

export const closeSocket = () => {
  return {
    type: CLOSE_SOCKET
  };
};

export const sendMessage = body => {
  return {
    type: "message",
    payload: body
  };
};

export const startConversation = body => {
  return {
    type: "startConversation",
    payload: body
  };
};

export const notificationNewSubmission = body => {
  return {
    type: NOTIFICATION_NEW_SUBMISSION,
    payload: body
  };
};
