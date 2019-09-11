import axios from "axios";
import {
  SET_CHAT
} from "./types";

export const getConversations = (userId) => async dispatch => {
  try {
    const data = await axios.get("/conversation/messages");
    dispatch({ type: SET_CHAT, payload: { data, userId }, });
  } catch (err) {
    console.log(err);
  }
}