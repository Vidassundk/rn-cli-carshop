import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useTheme} from '@/viewmodels/context/ThemeContext'; // Adjust for your path
import HomeScreen from '@/views/screens/HomeScreen'; // Adjust for your path
import {useNavigation} from '@react-navigation/native';

// Mock hooks
jest.mock('@/viewmodels/context/UserContext', () => ({
  useAuth: jest.fn(() => ({userName: 'Test User'})),
}));
jest.mock('@/viewmodels/handling/viewCars/useCarDataHandling', () => ({
  useCarDataHandling: jest.fn(() => ({
    cars: [],
    status: {isCarsLoading: false, carsError: null},
  })),
}));
jest.mock('@/viewmodels/context/ThemeContext', () => ({
  useTheme: jest.fn(() => ({
    colors: {primary: '#000'},
    toggleTheme: jest.fn(),
    spacing: {xl: 16, lg: 8},
  })),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

// Now inside your test cases
describe('HomeScreen', () => {
  it('toggles theme when theme button is pressed', () => {
    const mockToggleTheme = jest.fn();
    const mockNavigate = jest.fn();

    // Update mocks
    (useTheme as jest.Mock).mockReturnValue({
      colors: {primary: '#000'},
      toggleTheme: mockToggleTheme,
      spacing: {xl: 16, lg: 8},
    });
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    const {getByText} = render(<HomeScreen />);

    const themeToggleButton = getByText(/theme/i);
    fireEvent.press(themeToggleButton);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
