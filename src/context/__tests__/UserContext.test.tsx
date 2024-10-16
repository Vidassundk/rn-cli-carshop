import {renderHook, act} from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProvider, useAuth} from '../UserContext';
import React, {ReactNode} from 'react';

describe('UserContext', () => {
  let asyncStorageMock: Record<string, string | null>;

  beforeEach(() => {
    jest.clearAllMocks();
    asyncStorageMock = {};
    (AsyncStorage.getItem as jest.Mock).mockImplementation(async key => {
      return asyncStorageMock[key] || null;
    });

    (AsyncStorage.setItem as jest.Mock).mockImplementation(
      async (key, value) => {
        asyncStorageMock[key] = value;
      },
    );

    AsyncStorage.clear();
  });

  it('should load user preferences from AsyncStorage', async () => {
    asyncStorageMock.userName = 'Test User';
    asyncStorageMock.darkModePreference = 'true';

    const wrapper = ({children}: {children: ReactNode}) =>
      React.createElement(UserProvider, null, children);

    const {result, waitForNextUpdate} = renderHook(() => useAuth(), {wrapper});

    await waitForNextUpdate();

    expect(result.current.userName).toBe('Test User');
    expect(result.current.darkModePreference).toBe(true);
  });

  it('should save username to AsyncStorage', async () => {
    const wrapper = ({children}: {children: ReactNode}) =>
      React.createElement(UserProvider, null, children);

    const {result} = renderHook(() => useAuth(), {wrapper});

    await act(async () => {
      await result.current.changeUserName('New User');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('userName', 'New User');
    expect(result.current.userName).toBe('New User');

    expect(asyncStorageMock.userName).toBe('New User');
  });

  it('should toggle dark mode and save to AsyncStorage', async () => {
    const wrapper = ({children}: {children: ReactNode}) =>
      React.createElement(UserProvider, null, children);

    const {result} = renderHook(() => useAuth(), {wrapper});

    await act(async () => {
      await result.current.toggleDarkMode();
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'darkModePreference',
      'true',
    );
    expect(result.current.darkModePreference).toBe(true);

    expect(asyncStorageMock.darkModePreference).toBe('true');
  });
});
