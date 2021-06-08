import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

export interface User {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface AuthContextState {
  user: User;
  logIn: (credentials: SignInCredentials) => Promise<LogInResponse>;
  signOut(): void;
  updateUser(user: User): void;
  deleteUser(): void;
}

interface LogInResponse {
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem('@GoTickets/accessToken');

    const refreshToken = localStorage.getItem('@GoTickets/refreshToken');

    const user = localStorage.getItem('@GoTickets/user');

    if (accessToken && user && refreshToken) {
      api.defaults.headers.authorization = `Bearer ${accessToken}`;
      return { accessToken, refreshToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const logIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { accessToken, user, refreshToken } = response.data;

    localStorage.setItem('@GoTickets/accessToken', accessToken);

    localStorage.setItem('@GoTickets/refreshToken', refreshToken);

    localStorage.setItem('@GoTickets/user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${accessToken}`;

    const newAuthData = { accessToken, user, refreshToken };

    setAuthData(newAuthData);

    return newAuthData;
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@GoTickets/user');
    localStorage.removeItem('@GoTickets/accessToken');
    localStorage.removeItem('@GoTickets/refreshToken');

    setAuthData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoTickets/user', JSON.stringify(user));
      setAuthData({
        refreshToken: authData.refreshToken,
        accessToken: authData.accessToken,
        user,
      });
    },
    [setAuthData, authData],
  );

  const deleteUser = useCallback(async () => {
    await api.delete('/users');
    localStorage.removeItem('@GoTickets/user');
    localStorage.removeItem('@GoTickets/accessToken');
    localStorage.removeItem('@GoTickets/refreshToken');

    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authData.user,
        logIn,
        signOut,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const authState = useContext(AuthContext);

  if (!authState) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authState;
}
