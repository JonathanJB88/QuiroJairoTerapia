import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { prompt } from '@/data';

export enum Role {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface ChatMessage {
  role: Role;
  content: string;
}

interface ChatbotState {
  chatMessages: ChatMessage[];
  loading: boolean;
  errorMessage: string | undefined;
}

const initialChatMessages: ChatMessage[] = [
  { role: Role.SYSTEM, content: prompt.system },
  { role: Role.ASSISTANT, content: prompt.assistant },
];

const initialState: ChatbotState = {
  chatMessages: initialChatMessages,
  loading: false,
  errorMessage: undefined,
};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    onSendMessage: (state, action: PayloadAction<string>) => {
      const { payload: message } = action;
      state.loading = true;
      state.errorMessage = undefined;
      state.chatMessages.push({ role: Role.USER, content: message });
    },
    onSendMessageSuccess: (state, action: PayloadAction<ChatMessage>) => {
      const { payload: message } = action;
      state.chatMessages.push(message);
      state.loading = false;
    },
    onSendMessageFailure: (state, action: PayloadAction<string | undefined>) => {
      const { payload: errorMessage } = action;
      state.loading = false;
      state.errorMessage = errorMessage;
    },
    onResetChat: (state) => {
      state.chatMessages = initialChatMessages;
      state.loading = false;
      state.errorMessage = undefined;
    },
  },
});

export const { onSendMessage, onSendMessageSuccess, onSendMessageFailure, onResetChat } = chatbotSlice.actions;
