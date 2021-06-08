import axios from 'axios';

const baseURL = 'http://localhost:3333';

const api = axios.create({
  baseURL,
});

api.interceptors.response.use(undefined, async error => {
  if (
    error.config &&
    error.response &&
    error.response.status === 401 &&
    error.response.data.message === 'invalid JWT token'
  ) {
    try {
      const oldRefreshToken = localStorage.getItem('@GoTickets/refreshToken');

      if (!oldRefreshToken) {
        return window.location.reload();
      }

      const response = await axios.put(`${baseURL}/sessions`, {
        refreshToken: oldRefreshToken,
      });

      const { newRefreshToken: refreshToken, accessToken } = response.data;

      localStorage.setItem('@GoTickets/refreshToken', refreshToken);
      localStorage.setItem('@GoTickets/accessToken', accessToken);

      error.config.headers.authorization = `Bearer ${accessToken}`;

      return axios.request(error.config);
    } catch (error) {
      localStorage.removeItem('@GoTickets/refreshToken');
      localStorage.removeItem('@GoTickets/accessToken');
      localStorage.removeItem('@GoTickets/user');
      return window.location.reload();
    }
  }

  return Promise.reject(error);
});

export default api;
