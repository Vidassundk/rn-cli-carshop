import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {UserProvider} from './viewmodels/context/UserContext';
import {ThemeProvider} from './viewmodels/context/ThemeContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
