import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface Dialog {
//     id: number;
//     name: string;
// }

// interface MessageCompanion {
//     id: number;
//     message: string;
// }

// interface MessageUser {
//     id: number;
//     message: string;
// }

// interface DialogsState {
//     dialogs: Dialog[];
//     conversations: {
//         conversationDimych: {
//             messagesDimych: MessageCompanion[];
//             messagesUserProfile: MessageUser[];
//         }
//         conversationAndrey: {
//             messagesAndrey: MessageCompanion[];
//             messagesUserProfile: MessageUser[];
//         }
//         conversationSveta: {
//             messagesSveta: MessageCompanion[];
//             messagesUserProfile: MessageUser[];
//         }
//         conversationSasha: {
//             messagesSasha: MessageCompanion[];
//             messagesUserProfile: MessageUser[];
//         }
//         conversationViktor: {
//             messagesViktor: MessageCompanion[];
//             messagesUserProfile: MessageUser[];
//         }
//         conversationValera: {
//             messagesValera: MessageCompanion[];
//             messagesUserProfile: MessageUser[];
//         }
//     };
//     nameTarget: string;
//     newMessageText: string;
// }

// Определение типов для сообщений
interface Message {
  id: number;
  message: string;
}

// Определение типов для разговоров
export interface Conversation {
  [key: string]: {
    messagesUserProfile: Message[];
    [key: string]: Message[]; // Остальные сообщения конкретного разговора
  };
}

// Определение типа для начального состояния
export interface DialogsState {
  dialogs: { id: number; name: string }[];
  conversations: Conversation;
  nameTarget: string;
  newMessageText: string;
}

const initialState: DialogsState = {
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Viktor" },
    { id: 6, name: "Valera" }
  ],
  conversations: {
    conversationDimych: {
      messagesDimych: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Fine!" },
        { id: 3, message: "Yo! Go!" },
      ],
      messagesUserProfile: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Go play basketball!" },
      ]
    },
    conversationAndrey: {
      messagesAndrey: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Go play basketball!" },
      ],
      messagesUserProfile: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Fine!" },
        { id: 3, message: "Yo! Go!" },
      ]
    },
    conversationSveta: {
      messagesSveta: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Fine!" },
        { id: 3, message: "Yo! Go!" },
      ],
      messagesUserProfile: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Go play basketball!" },
      ]
    },
    conversationSasha: {
      messagesSasha: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Go play basketball!" },

      ],
      messagesUserProfile: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Fine!" },
        { id: 3, message: "Yo! Go!" },
      ]
    },
    conversationViktor: {
      messagesViktor: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Fine!" },
        { id: 3, message: "Yo! Go!" },
      ],
      messagesUserProfile: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Go play basketball!" },
      ]
    },
    conversationValera: {
      messagesValera: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Go play basketball!" },

      ],
      messagesUserProfile: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Fine!" },
        { id: 3, message: "Yo! Go!" },
      ]
    }
  },
  nameTarget: '',
  newMessageText: '',
}

export const dialogsSlice = createSlice({
  name: 'dialogsPage',
  initialState,
  reducers: {
    addMessage: (state) => {
      let conversation = `conversation${state.nameTarget}`;
      const lastIdEl = state.conversations[conversation].messagesUserProfile
      [state.conversations[conversation].messagesUserProfile.length - 1].id;
      const newMessage = {
        id: lastIdEl + 1,
        message: state.newMessageText
      };
      state.conversations[conversation].messagesUserProfile.push(newMessage);
      state.newMessageText = '';
    },
    updateNameTarget: (state, action: PayloadAction<string>) => {
      state.nameTarget = action.payload;
    },
    updateNewMessageText: (state, action: PayloadAction<string>) => {
      state.newMessageText = action.payload;
    }
  }
})

export const { addMessage, updateNameTarget, updateNewMessageText } = dialogsSlice.actions;
export const selectDialogs = (state: { dialogsPage: DialogsState }) => state.dialogsPage.dialogs;
export const selectConversations = (state: { dialogsPage: DialogsState }) =>
  state.dialogsPage.conversations;
export const selectNameTarget = (state: { dialogsPage: DialogsState }) => state.dialogsPage.nameTarget;
export const selectNewMessageText = (state: { dialogsPage: DialogsState }) => state.dialogsPage.newMessageText;

export default dialogsSlice.reducer;