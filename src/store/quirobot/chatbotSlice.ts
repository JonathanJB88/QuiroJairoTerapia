import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  { role: Role.SYSTEM, content: 'Eres un asistente muy eficiente que responde consultas' },
  { role: Role.ASSISTANT, content: 'Hola, ¿en qué puedo ayudarte?' },
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
      state.chatMessages = [...state.chatMessages, { role: Role.USER, content: message }];
    },
    onSendMessageSuccess: (state, action: PayloadAction<ChatMessage>) => {
      const { payload: message } = action;
      state.chatMessages = [...state.chatMessages, message];
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
