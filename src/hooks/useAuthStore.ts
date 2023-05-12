import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiClient from '@/helpers/apiConfig';
import { RootState, onChecking, onLogin, onLogout, cleanErrorMessage, User } from '@/store';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleErrorMessage = (message: string) => {
    dispatch(onLogout(message));
    setTimeout(() => {
      dispatch(cleanErrorMessage());
    }, 3000);
  };

  const login = async ({ email, password }: LoginData) => {
    dispatch(onChecking());
    try {
      const {
        data: { uid, name, role, token, ok },
      } = await apiClient.post<User>('/api/auth/login', { email, password });

      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ uid, name, role, ok, token }));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg ? error.response.data.msg : 'Credenciales Inválidas';
      handleErrorMessage(errorMessage);
    }
  };

  const register = async ({ name, email, password }: RegisterData) => {
    dispatch(onChecking());
    try {
      const {
        data: { uid, name: username, role, token, ok },
      } = await apiClient.post<User>('/api/auth/signup', { name, email, password });

      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ uid, name: username, role, ok, token }));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg ? error.response.data.msg : 'Error al crear usuario';
      handleErrorMessage(errorMessage);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const {
        data: { uid, name, role, token, ok },
      } = await apiClient.get<User>('/api/auth/renewToken');

      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

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
