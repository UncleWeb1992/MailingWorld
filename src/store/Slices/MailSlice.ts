import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Messages } from "../../constants/db";
import { MessageFields, MessageType } from "../../types/types";

const initialState = {
  parentField: MessageFields.Incoming as string,
  subField: "",
  messages: Messages,
  send: false,
};

const MailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setparentField: (state, action: PayloadAction<string>) => {
      state.parentField = action.payload;
    },
    setSubField: (state, action: PayloadAction<string>) => {
      state.subField = action.payload;
    },
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
    setSend: (state, action: PayloadAction<boolean>) => {
      state.send = action.payload;
    },
    deleteMessage: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const filtered = state.messages.filter((msg) => msg.id !== id);
      state.messages = filtered;
    },
    updateMessage: (state, action: PayloadAction<MessageType>) => {
      const { id } = action.payload;
      const updated = state.messages.map((msg) =>
        msg.id === id ? action.payload : msg
      );
      state.messages = updated;
    },
  },
});

const { reducer: mailReducer, actions } = MailSlice;
export const {
  setparentField,
  setSubField,
  setMessages,
  setSend,
  deleteMessage,
  updateMessage,
} = actions;

export default mailReducer;
