import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiClient from '@/helpers/apiConfig';
import { RootState, User, AppDispatch, onChecking, onLogin, onLogout, cleanErrorMessage } from '@/store';
import { handleErrorMessage, setToken } from '@/helpers';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const login = async ({ email, password }: LoginData) => {
    dispatch(onChecking());
    try {
      const {
        data: { uid, name, role, token, ok },
      } = await apiClient.post<User>('/api/auth/login', { email, password });

      setToken(token);

      dispatch(onLogin({ uid, name, role, ok, token }));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg ? error.response.data.msg : 'Credenciales Inválidas';
      handleErrorMessage(errorMessage, dispatch, onLogout, cleanErrorMessage);
    }
  };

  const register = async ({ name, email, password }: RegisterData) => {
    dispatch(onChecking());
    try {
      const {
        data: { uid, name: username, role, token, ok },
      } = await apiClient.post<User>('/api/auth/signup', { name, email, password });

      setToken(token);

      dispatch(onLogin({ uid, name: username, role, ok, token }));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg ? error.response.data.msg : 'Error al crear usuario';
      handleErrorMessage(errorMessage, dispatch, onLogout, cleanErrorMessage);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const {
        data: { uid, name, role, token, ok },
      } = await apiClient.get<User>('/api/auth/renewToken');

      setToken(token);

      dispatch(onLogin({ uid, name, role, ok, token }));
    } catch (error) {
      console.log('Failed to renew token: ', error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //Props
    status,
    user,
    errorMessage,
    //Functions
    login,
    register,
    checkAuthToken,
    logout,
  };
};
