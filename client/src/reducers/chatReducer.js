import { SET_CHAT } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT: {
      const { data } = action.payload.data;

      const chatObject = data.reduce((prev, curr) => {
        const user = action.payload.userId;
        const other = curr.user1.id !== user ? curr.user1 : curr.user2;

        let lastMessage = "";
        let index = curr.messages.length;
        while (index > 0) {
          if (curr.messages.sender !== user) {
            lastMessage = curr.messages[index];
            break;
          }
          index--;
        }
        const conversationObject = {
          user: other,
          lastMessage,
          status: "offline",
          messages: curr.messages,
        };
        prev[curr.id] = conversationObject;
        return prev;
      }, {});
      return chatObject;
    }
    default:
      return state;
  }
}