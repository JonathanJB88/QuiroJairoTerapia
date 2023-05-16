import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  AppDispatch,
  onToggleDropdown,
  onToggleAuthModal,
  onToggleChatBox,
  onToggleResetFormFlag,
  onResetUI,
} from '@/store';

export const useUIStore = () => {
  const { showDropdown, showAuthModal, showChatBox, resetFormFlag } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch<AppDispatch>();

  const uiActions = {
    toggleDropdown: () => dispatch(onToggleDropdown()),
    toggleAuthModal: () => dispatch(onToggleAuthModal()),
    toggleChatBox: () => dispatch(onToggleChatBox()),
    toggleResetFormFlag: () => dispatch(onToggleResetFormFlag()),
    resetUI: () => dispatch(onResetUI()),
  };

  return { showDropdown, showAuthModal, showChatBox, resetFormFlag, ...uiActions };
};
