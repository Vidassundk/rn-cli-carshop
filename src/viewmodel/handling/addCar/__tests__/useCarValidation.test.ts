import {renderHook} from '@testing-library/react-hooks';
import {Alert} from 'react-native';
import {CarForm} from '../useAddCarForm';
import {useCarValidation} from '../useCarValidation';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('useCarValidation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when all fields are valid', () => {
    const carData: CarForm = {
      brand: 'Toyota',
      model: 'Corolla',
      makeYear: 2020,
      gearbox: 'Automatic',
      color: 'Blue',
      photoUrl: 'http://example.com/photo.jpg',
    };

    const {result} = renderHook(() => useCarValidation(carData));
    const isValid = result.current.validateCarForm();

    expect(isValid).toBe(true);
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('should show an alert and return false when a field is missing', () => {
    const carData: CarForm = {
      brand: null,
      model: 'Corolla',
      makeYear: 2020,
      gearbox: 'Automatic',
      color: 'Blue',
      photoUrl: 'http://example.com/photo.jpg',
    };

    const {result} = renderHook(() => useCarValidation(carData));
    const isValid = result.current.validateCarForm();

    expect(isValid).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please fill out all fields',
    );
  });

  it('should show an alert when makeYear is missing', () => {
    const carData: CarForm = {
      brand: 'Toyota',
      model: 'Corolla',
      makeYear: null,
      gearbox: 'Automatic',
      color: 'Blue',
      photoUrl: 'http://example.com/photo.jpg',
    };

    const {result} = renderHook(() => useCarValidation(carData));
    const isValid = result.current.validateCarForm();

    expect(isValid).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please fill out all fields',
    );
  });

  it('should show an alert when gearbox is missing', () => {
    const carData: CarForm = {
      brand: 'Toyota',
      model: 'Corolla',
      makeYear: 2020,
      gearbox: null,
      color: 'Blue',
      photoUrl: 'http://example.com/photo.jpg',
    };

    const {result} = renderHook(() => useCarValidation(carData));
    const isValid = result.current.validateCarForm();

    expect(isValid).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please fill out all fields',
    );
  });

  it('should show an alert when color is missing', () => {
    const carData: CarForm = {
      brand: 'Toyota',
      model: 'Corolla',
      makeYear: 2020,
      gearbox: 'Automatic',
      color: null,
      photoUrl: 'http://example.com/photo.jpg',
    };

    const {result} = renderHook(() => useCarValidation(carData));
    const isValid = result.current.validateCarForm();

    expect(isValid).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please fill out all fields',
    );
  });
});
