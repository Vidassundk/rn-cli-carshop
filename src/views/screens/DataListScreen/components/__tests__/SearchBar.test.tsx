import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchBar from '../SearchBar'; // Adjust the import based on your folder structure
import {useTheme} from '@/viewmodels/context/ThemeContext'; // Mock the theme

jest.mock('@/viewmodels/context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('SearchBar Component', () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      colors: {
        card: '#ffffff',
        border: '#cccccc',
        text: '#000000',
      },
      spacing: {
        md: 16,
        sm: 8,
      },
    });
  });

  it('renders correctly with theme values', () => {
    const {getByPlaceholderText} = render(
      <SearchBar setSearchQuery={mockSetSearchQuery} />,
    );

    const searchInput = getByPlaceholderText(
      'Search by brand, model, year, gearbox, color',
    );

    const style = searchInput.props.style;

    // Flatten the style array and check individual style properties
    const flattenedStyle = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;

    expect(flattenedStyle.backgroundColor).toBe('#ffffff');
    expect(flattenedStyle.borderColor).toBe('#cccccc');
    expect(flattenedStyle.color).toBe('#000000');
    expect(flattenedStyle.paddingHorizontal).toBe(16);
    expect(flattenedStyle.marginHorizontal).toBe(16);
    expect(flattenedStyle.borderRadius).toBe(8);
  });

  it('calls setSearchQuery when input changes', () => {
    const {getByPlaceholderText} = render(
      <SearchBar setSearchQuery={mockSetSearchQuery} />,
    );

    const searchInput = getByPlaceholderText(
      'Search by brand, model, year, gearbox, color',
    );

    fireEvent.changeText(searchInput, 'Toyota');

    expect(mockSetSearchQuery).toHaveBeenCalledWith('Toyota');
    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
  });

  it('displays the correct placeholder text', () => {
    const {getByPlaceholderText} = render(
      <SearchBar setSearchQuery={mockSetSearchQuery} />,
    );

    expect(
      getByPlaceholderText('Search by brand, model, year, gearbox, color'),
    ).toBeTruthy();
  });
});
