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

    const wrapper = ({children}: {children: ReactNode}) =>
      React.createElement(UserProvider, null, children);

    const {result, waitForNextUpdate} = renderHook(() => useAuth(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.userName).toBe('Test User');
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

  it('should have default userId', () => {
    const wrapper = ({children}: {children: ReactNode}) =>
      React.createElement(UserProvider, null, children);

    const {result} = renderHook(() => useAuth(), {wrapper});

    expect(result.current.userId).toBe('User1');
  });
});
