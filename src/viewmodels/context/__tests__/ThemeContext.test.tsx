import React from 'react';
import {render, act, fireEvent} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'react-native';
import {ThemeProvider, useTheme} from '../ThemeContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const TestComponent = () => {
  const {theme, toggleTheme, navigationTheme} = useTheme();

  return (
    <>
      <Text>{`Current theme: ${theme}`}</Text>
      <Text>{`Navigation theme: ${
        navigationTheme.dark ? 'dark' : 'light'
      }`}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load the theme from AsyncStorage and default to system theme if not saved', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const {getByText} = render(
      <ThemeProvider initialColorScheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    await act(async () => {});

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('theme');
    expect(getByText('Current theme: dark')).toBeTruthy();
    expect(getByText('Navigation theme: dark')).toBeTruthy();
  });

  it('should load the saved theme from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('light');

    const {getByText} = render(
      <ThemeProvider initialColorScheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    await act(async () => {});

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('theme');
    expect(getByText('Current theme: light')).toBeTruthy();
    expect(getByText('Navigation theme: light')).toBeTruthy();
  });

  it('should toggle the theme and update AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const {getByText, getByRole} = render(
      <ThemeProvider initialColorScheme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    await act(async () => {});

    const toggleButton = getByRole('button', {name: 'Toggle Theme'});

    expect(getByText('Current theme: light')).toBeTruthy();

    await act(async () => {
      fireEvent.press(toggleButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(getByText('Current theme: dark')).toBeTruthy();

    await act(async () => {
      fireEvent.press(toggleButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(getByText('Current theme: light')).toBeTruthy();
  });
});
