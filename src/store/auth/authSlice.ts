import { UserRole } from '@/models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  ok: boolean;
  uid: string;
  name: string;
  role: UserRole;
  token: string;
}

interface AuthState {
  status: 'checking' | 'authenticated' | 'unauthenticated';
  user: User | null;
  errorMessage: string | undefined;
}

const initialState: AuthState = {
  status: 'checking',
  user: null,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = null;
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = 'unauthenticated';
      state.user = null;
      state.errorMessage = payload;
    },
    cleanErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, cleanErrorMessage } = authSlice.actions;
