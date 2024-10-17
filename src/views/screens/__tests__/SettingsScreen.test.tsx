import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SettingsScreen from '../SettingsScreen';
import {Alert} from 'react-native';
import {useAuth} from '@/viewmodels/context/UserContext';
import * as ThemeContextModule from '@/viewmodels/context/ThemeContext';

jest.mock('@/viewmodels/context/UserContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('SettingsScreen', () => {
  const mockChangeUserName = jest.fn();
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      userName: 'JohnDoe',
      changeUserName: mockChangeUserName,
    });

    jest.spyOn(ThemeContextModule, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
      colors: {
        background: '#fff',
        text: '#000',
        border: '#ccc',
        primary: '#6200ee',
        card: '#f0f0f0',
        notification: '#ff0000',
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<SettingsScreen />);

    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Change Username:')).toBeTruthy();
    expect(getByPlaceholderText('Enter new username')).toBeTruthy();
    expect(getByText('Update Username')).toBeTruthy();
    expect(getByText('Dark Mode:')).toBeTruthy();
    expect(getByText('Disabled')).toBeTruthy();
  });

  it('updates username when button is pressed', () => {
    const {getByText, getByPlaceholderText} = render(<SettingsScreen />);
    const input = getByPlaceholderText('Enter new username');
    const button = getByText('Update Username');

    fireEvent.changeText(input, 'JaneDoe');
    fireEvent.press(button);

    expect(mockChangeUserName).toHaveBeenCalledWith('JaneDoe');
  });

  it('displays success alert when username is updated', () => {
    const {getByText, getByPlaceholderText} = render(<SettingsScreen />);
    const input = getByPlaceholderText('Enter new username');
    const button = getByText('Update Username');

    fireEvent.changeText(input, 'JaneDoe');
    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Success',
      'Username updated successfully!',
    );
  });

  it('toggles theme when switch is toggled', () => {
    const {getByTestId} = render(<SettingsScreen />);
    const switchComponent = getByTestId('dark-mode-switch');

    fireEvent(switchComponent, 'valueChange', true);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
