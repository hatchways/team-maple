import { 
  SET_CURRENT_CHAT,
  ON_CHAT_PAGE,
  OFF_CHAT_PAGE
} from "./types";

export const setCurrentChat = conversationId => {
  return {
      type: SET_CURRENT_CHAT,
      payload: conversationId,
  }
}
export const onChatPage = conversationId => {
  return {
      type: ON_CHAT_PAGE,
      payload: conversationId,
  }
}
export const offChatPage = conversationId => {
  return {
      type: OFF_CHAT_PAGE,
      payload: conversationId,
  }
}
