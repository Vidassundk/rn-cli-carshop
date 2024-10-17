import React from 'react';
import {render} from '@testing-library/react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/AppNavigator';
import DetailScreen from '..';

// Mock the route prop type
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

jest.mock('@/viewmodels/context/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      text: '#000',
      card: '#fff',
    },
    spacing: {
      md: 16,
      xs: 8,
    },
  }),
}));

describe('DetailScreen', () => {
  const mockRoute: DetailScreenRouteProp = {
    key: 'DetailScreen',
    name: 'DetailScreen',
    params: {
      car: {
        id: '1',
        userId: '1',
        brand: 'Toyota',
        model: 'Corolla',
        makeYear: 2020,
        gearbox: 'Automatic',
        color: 'Red',
        datePosted: '2021-01-01',
        photoUrl: 'https://example.com/car.jpg',
      },
    },
  };

  it('renders car details correctly', () => {
    const {getByText} = render(<DetailScreen route={mockRoute} />);

    expect(getByText('Toyota Corolla (2020)')).toBeTruthy();
    expect(getByText('Gearbox: Automatic')).toBeTruthy();
    expect(getByText('Color: Red')).toBeTruthy();
    expect(getByText('Date Posted: 1/1/2021')).toBeTruthy();
  });
});
