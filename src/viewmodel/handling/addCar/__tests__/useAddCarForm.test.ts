import {renderHook, act} from '@testing-library/react-hooks';
import {useAddCarForm} from '../useAddCarForm';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Alert} from 'react-native';
import React from 'react';
import {useAuth} from '../../../../context/UserContext';
import {useCarPostsService} from '../../../data/useCarPostsService';
import {useSupportedCarsService} from '../../../data/useSupportedCarService';
import {useCarValidation} from '../useCarValidation';

jest.mock('../../../../context/UserContext');
jest.mock('../../../data/useCarPostsService');
jest.mock('../../../data/useSupportedCarService');
jest.mock('../../../../utils/hooks/useYearOptions', () => ({
  useYearOptions: jest.fn(() => [2023, 2022, 2021]),
}));
jest.mock('../useCarImageUpdater', () => ({
  useCarImageUpdater: jest.fn(),
}));
jest.mock('../useCarValidation');

jest.spyOn(Alert, 'alert');

describe('useAddCarForm', () => {
  let queryClient: QueryClient;

  const wrapper = ({children}: {children: React.ReactNode}) => {
    return React.createElement(
      QueryClientProvider,
      {client: queryClient},
      children,
    );
  };

  const flushPromises = () =>
    new Promise<void>(resolve => setTimeout(resolve, 0));

  const mockAuth = useAuth as jest.Mock;
  const mockUseCarPostsService = useCarPostsService as jest.Mock;
  const mockUseSupportedCarsService = useSupportedCarsService as jest.Mock;
  const mockUseCarValidation = useCarValidation as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    queryClient = new QueryClient();

    mockAuth.mockReturnValue({userId: '123'});
    mockUseCarPostsService.mockReturnValue({
      mutations: {addNewCar: jest.fn()},
    });
    mockUseSupportedCarsService.mockReturnValue({
      supportedBrandsAndModels: {
        supportedCarBrandsAndModels: [
          {brand: 'Toyota', brandImage: 'url', models: [{name: 'Corolla'}]},
        ],
        isBrandsLoading: false,
        brandsError: null,
      },
    });

    mockUseCarValidation.mockReturnValue({
      validateCarForm: jest.fn(() => true),
    });
  });

  it('should update car data correctly when updateCarData is called', () => {
    const {result} = renderHook(() => useAddCarForm({} as any), {wrapper});

    act(() => {
      result.current.formData.updateCarData('brand', 'Toyota');
    });

    expect(result.current.formData.carData.brand).toBe('Toyota');
  });

  it('should validate and submit the car when handleAddCar is called', async () => {
    const mockAddNewCar = jest.fn();
    mockUseCarPostsService.mockReturnValue({
      mutations: {addNewCar: mockAddNewCar},
    });

    const {result} = renderHook(
      () => useAddCarForm({goBack: jest.fn()} as any),
      {wrapper},
    );

    act(() => {
      result.current.formData.updateCarData('brand', 'Toyota');
      result.current.formData.updateCarData('model', 'Corolla');
      result.current.formData.updateCarData('makeYear', 2022);
      result.current.formData.updateCarData('gearbox', 'Manual');
      result.current.formData.updateCarData('color', 'Black');
    });

    await act(async () => {
      await result.current.formActions.handleAddCar();
    });

    expect(mockAddNewCar).toHaveBeenCalledWith({
      id: expect.any(String),
      userId: '123',
      brand: 'Toyota',
      model: 'Corolla',
      makeYear: 2022,
      gearbox: 'Manual',
      color: 'Black',
      photoUrl: '',
      datePosted: expect.any(String),
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      'Success',
      'Car added successfully!',
    );
  });

  it('should show an error if validation fails', async () => {
    mockUseCarValidation.mockReturnValue({
      validateCarForm: jest.fn(() => false),
    });

    const {result} = renderHook(
      () => useAddCarForm({goBack: jest.fn()} as any),
      {wrapper},
    );

    await act(async () => {
      await result.current.formActions.handleAddCar();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please fill out all fields',
    );
    expect(mockUseCarValidation().validateCarForm).toHaveBeenCalled();
  });

  it('should handle error when adding a car fails', async () => {
    const mockAddNewCar = jest
      .fn()
      .mockRejectedValueOnce(new Error('Network Error'));

    mockUseCarPostsService.mockReturnValue({
      mutations: {addNewCar: mockAddNewCar},
    });

    const {result} = renderHook(
      () => useAddCarForm({goBack: jest.fn()} as any),
      {wrapper},
    );

    act(() => {
      result.current.formData.updateCarData('brand', 'Toyota');
      result.current.formData.updateCarData('model', 'Corolla');
      result.current.formData.updateCarData('makeYear', 2022);
      result.current.formData.updateCarData('gearbox', 'Manual');
      result.current.formData.updateCarData('color', 'Black');
    });

    await act(async () => {
      await result.current.formActions.handleAddCar();
    });

    await flushPromises();

    expect(mockAddNewCar).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to add the car');
  });
});
