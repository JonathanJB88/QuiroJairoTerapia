import { AppDispatch, cleanErrorMessage, onCleanErrorMessage, onFailed, onLogout } from '@/store';

type FirstAction = typeof onLogout | typeof onFailed;
type SecondAction = typeof cleanErrorMessage | typeof onCleanErrorMessage;

export const handleErrorMessage = (
  message: string,
  dispatch: AppDispatch,
  firstAction: FirstAction,
  secondAction: SecondAction
) => {
  dispatch(firstAction(message));
  setTimeout(() => {
    dispatch(secondAction());
  }, 3000);
};
