import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  showDropdown: boolean;
  showAuthModal: boolean;
  resetFormFlag: boolean;
}

const initialState: UIState = {
  showDropdown: false,
  showAuthModal: false,
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
    onResetUI: (state) => {
      state.showDropdown = false;
      state.showAuthModal = false;
      state.resetFormFlag = false;
    },
  },
});

export const { onToggleDropdown, onToggleAuthModal, onToggleResetFormFlag, onResetUI } = uiSlice.actions;
