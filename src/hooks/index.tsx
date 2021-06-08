import React from 'react';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/themes/defaultTheme';
import { AuthContextProvider } from './auth';
import { ToastProvider } from './toast';

const RootProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContextProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
