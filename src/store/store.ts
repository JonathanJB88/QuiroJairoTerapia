import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { commentSlice } from './comment/commentSlice';
import { uiSlice } from './ui/uiSlice';
import { chatbotSlice } from './quirobot/chatbotSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    comment: commentSlice.reducer,
    ui: uiSlice.reducer,
    chatbot: chatbotSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
