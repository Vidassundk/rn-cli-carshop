// AddDataScreen.test.tsx
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddDataScreen from '../AddDataScreen'; // Adjust the path accordingly
import {useAddCarForm} from '@/viewmodels/handling/addCar/useAddCarForm';
import {useTheme} from '@/viewmodels/context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';

import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/AppNavigator';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@/viewmodels/handling/addCar/useAddCarForm');
jest.mock('@/viewmodels/context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

type MockNavigation = StackNavigationProp<RootStackParamList, 'AddDataScreen'>;

const mockNavigation: Partial<MockNavigation> = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockRoute: RouteProp<RootStackParamList, 'AddDataScreen'> = {
  key: 'test-key',
  name: 'AddDataScreen',
  params: undefined,
};

describe('AddDataScreen', () => {
  const mockUseAddCarForm = {
    formData: {
      carData: {
        photoUrl: null,
        brand: 'Toyota',
        model: 'Corolla',
        makeYear: 2021,
        gearbox: 'Automatic',
        color: 'Red',
      },
      updateCarData: jest.fn(),
    },
    formActions: {handleAddCar: jest.fn()},
    status: {isBrandsLoading: false, brandsError: null},
    options: {
      supportedCarBrandsAndModels: [
        {brand: 'Toyota', models: [{name: 'Corolla'}, {name: 'Camry'}]},
      ],
      yearOptions: [2020, 2021, 2022],
    },
  };

  const mockTheme = {
    colors: {
      text: '#000',
      card: '#fff',
      border: '#ccc', // Ensure border color is mocked
      primary: '#0000ff',
      notification: '#ff0000',
    },
    spacing: {
      lg: 24,
      md: 16,
      sm: 8,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAddCarForm as jest.Mock).mockReturnValue(mockUseAddCarForm);
    (useTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders the form fields correctly', () => {
    const {getByText} = render(
      <AddDataScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    // Check if brand picker field is rendered
    expect(getByText('Brand')).toBeTruthy();
    expect(getByText('Toyota')).toBeTruthy();

    // Check if model picker field is rendered
    expect(getByText('Model')).toBeTruthy();
    expect(getByText('Corolla')).toBeTruthy();

    // Check if year picker field is rendered
    expect(getByText('Year')).toBeTruthy();
    expect(getByText('2021')).toBeTruthy();

    // Check if gearbox picker field is rendered
    expect(getByText('Gearbox')).toBeTruthy();
    expect(getByText('Automatic')).toBeTruthy();

    // Check if color picker field is rendered
    expect(getByText('Color')).toBeTruthy();
    expect(getByText('Red')).toBeTruthy();
  });

  it('handles value change for the pickers', () => {
    const {getByText} = render(
      <AddDataScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    // Simulate value change for the brand picker
    fireEvent.press(getByText('Toyota'));
    fireEvent(getByText('Toyota'), 'valueChange', 'Toyota');
    expect(mockUseAddCarForm.formData.updateCarData).toHaveBeenCalledWith(
      'brand',
      'Toyota',
    );

    // Simulate value change for the model picker
    fireEvent.press(getByText('Corolla'));
    fireEvent(getByText('Corolla'), 'valueChange', 'Corolla');
    expect(mockUseAddCarForm.formData.updateCarData).toHaveBeenCalledWith(
      'model',
      'Corolla',
    );
  });

  it('opens and closes modals correctly', () => {
    const {getByText} = render(
      <AddDataScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    // Open brand picker modal
    fireEvent.press(getByText('Brand'));
    expect(mockUseAddCarForm.formData.updateCarData).not.toBeCalled();

    // Close brand picker modal
    fireEvent.press(getByText('Brand'));
    expect(mockUseAddCarForm.formData.updateCarData).not.toBeCalled();
  });

  it('displays an animated car image when photoUrl is available', async () => {
    mockUseAddCarForm.formData.carData.photoUrl =
      'https://example.com/car.jpg' as any;

    const {getByTestId} = render(
      <AddDataScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    const animatedImage = getByTestId('animated-image');
    expect(animatedImage).toBeTruthy();
  });

  it('handles Add Car button press', () => {
    const {getByText} = render(
      <AddDataScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    const addCarButton = getByText('Add Car');
    fireEvent.press(addCarButton);

    expect(mockUseAddCarForm.formActions.handleAddCar).toHaveBeenCalled();
  });
});
