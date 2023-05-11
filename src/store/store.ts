import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { commentSlice } from './comment/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    comment: commentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
