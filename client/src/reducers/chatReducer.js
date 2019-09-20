import {
  SET_CHAT,
  UPDATE_CHAT,
  UPDATE_CONVERSATION,
  UPDATE_READ_CHAT,
  SET_UNREAD_CHAT,
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT: {
      const { data } = action.payload.data;

      const chatObject = data.reduce((prev, curr) => {
        const user = action.payload.userId;
        const read = curr.user1.id === user ? curr.user1Read : curr.user2Read;
        const other = curr.user1.id !== user ? curr.user1 : curr.user2;

        let lastMessage = "";
        let index = curr.messages.length - 1;
        while (index >= 0) {
          if (curr.messages[index].sender !== user) {
            lastMessage =  { 
              content: curr.messages[index].content,
              createdAt: curr.messages[index].createdAt,
            }
            break;
          }
          index--;
        }
        const conversationObject = {
          user: other,
          lastMessage,
          messages: curr.messages,
          read,
        };
        prev[curr.id] = conversationObject;
        return prev;
      }, {});
      return chatObject;
    }
    case UPDATE_CHAT: {
      const { conversation: conversationId, content, sender, createdAt } = action.payload;
      return { 
        ...state,
        [conversationId]: {
          ...state[conversationId],
          messages: [ 
            ...state[conversationId].messages,
            action.payload,
          ],
          lastMessage: state[conversationId].user.id === sender ? { content, createdAt } : state[conversationId].lastMessage,
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
          read: true,
        },
      };
    }
    case UPDATE_READ_CHAT: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          read: true,
        },
      };
    }
    case SET_UNREAD_CHAT: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          read: false,
        },
      }
    }
    default:
      return state;
  }
}