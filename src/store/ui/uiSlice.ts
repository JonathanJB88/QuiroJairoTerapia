import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  showDropdown: boolean;
  showAuthModal: boolean;
  showChatBox: boolean;
  resetFormFlag: boolean;
}

const initialState: UIState = {
  showDropdown: false,
  showAuthModal: false,
  showChatBox: false,
  resetFormFlag: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onToggleDropdown: (state) => {
      state.showDropdown = !state.showDropdown;
    },
    onToggleAuthModal: (state) => {
      state.showAuthModal = !state.showAuthModal;
    },
    onToggleResetFormFlag: (state) => {
      state.resetFormFlag = !state.resetFormFlag;
    },
    onToggleChatBox: (state) => {
      state.showChatBox = !state.showChatBox;
    },
    onResetUI: (state) => {
      state.showDropdown = false;
      state.showAuthModal = false;
      state.resetFormFlag = false;
    },
  },
});

export const { onToggleDropdown, onToggleAuthModal, onToggleResetFormFlag, onToggleChatBox, onResetUI } =
  uiSlice.actions;
