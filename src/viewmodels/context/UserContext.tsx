import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserContextType {
  userId: string;
  userName: string;
  changeUserName: (newUserName: string) => void;
}

const defaultValues: UserContextType = {
  userId: 'User1',
  userName: 'User',

  changeUserName: () => {},
};

const UserContext = createContext<UserContextType>(defaultValues);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [userId] = useState('User1');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const loadUserPreferences = async () => {
      const storedUserName = await AsyncStorage.getItem('userName');

      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    loadUserPreferences();
  }, []);

  const changeUserName = async (newName: string) => {
    setUserName(newName);
    await AsyncStorage.setItem('userName', newName);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userName,

        changeUserName,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
