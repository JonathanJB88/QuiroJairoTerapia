export const setToken = (token: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('token-init-date', new Date().getTime().toString());
};
