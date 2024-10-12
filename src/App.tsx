import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {UserProvider} from './context/UserContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
