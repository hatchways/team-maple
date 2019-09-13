import { 
  SET_CURRENT_CHAT,
} from "./types";

export const setCurrentChat = conversationId => {
  return {
      type: SET_CURRENT_CHAT,
      payload: conversationId,
  }
}
