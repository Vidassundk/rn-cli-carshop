import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../models/User';

const defaultValues = {
  userId: 'User1',
  userName: 'User',
  darkModePreference: false,
  changeUserName: () => {},
  toggleDarkMode: () => {},
};

const UserContext = createContext<User>(defaultValues);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [userId] = useState('User1');
  const [userName, setUserName] = useState('User');
  const [darkModePreference, setDarkModePreference] = useState(false);

  useEffect(() => {
    // Load user preferences from AsyncStorage
    const loadUserPreferences = async () => {
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedDarkMode = await AsyncStorage.getItem('darkModePreference');

      if (storedUserName) setUserName(storedUserName);
      if (storedDarkMode !== null)
        setDarkModePreference(storedDarkMode === 'true');
    };

    loadUserPreferences();
  }, []);

  const changeUserName = async (newName: string) => {
    setUserName(newName);
    await AsyncStorage.setItem('userName', newName);
  };

  const toggleDarkMode = async () => {
    setDarkModePreference(prev => !prev);
    await AsyncStorage.setItem(
      'darkModePreference',
      (!darkModePreference).toString(),
    );
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userName,
        darkModePreference,
        changeUserName,
        toggleDarkMode,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
