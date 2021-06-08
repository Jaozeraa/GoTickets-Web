import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import RootProvider from './hooks';
import GlobalStyles from './styles/global';

function App() {
  return (
    <RootProvider>
      <GlobalStyles />
      <Router>
        <Routes />
      </Router>
    </RootProvider>
  );
}

export default App;
