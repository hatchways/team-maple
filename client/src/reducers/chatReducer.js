import { SET_CHAT, UPDATE_CHAT, UPDATE_CONVERSATION } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT: {
      const { data } = action.payload.data;

      const chatObject = data.reduce((prev, curr) => {
        console.log(curr);
        const user = action.payload.userId;
        const other = curr.user1.id !== user ? curr.user1 : curr.user2;

        let lastMessage = "";
        let index = curr.messages.length - 1;
        while (index >= 0) {
          if (curr.messages[index].sender !== user) {
            lastMessage = curr.messages[index].content;
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
    case UPDATE_CHAT: {
      const { conversation: conversationId, content, sender } = action.payload;
      return { 
        ...state,
        [conversationId]: {
          ...state[conversationId],
          messages: [ 
            ...state[conversationId].messages,
            action.payload,
          ],
          lastMessage: state[conversationId].user.id === sender ? content : state[conversationId].lastMessage,
        },
      }
    }
    case UPDATE_CONVERSATION: {
      const { id: conversationId, user1, user2 } = action.payload.body;
      const otherId = action.payload.user;
      return {
        ...state,
        [conversationId] : {
          user: user1.id === otherId ? user1 : user2,
          messages: [],
          lastMessage: "",
          status: "offline",
        },
      };
    }
    default:
      return state;
  }
}