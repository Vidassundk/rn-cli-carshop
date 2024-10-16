import {renderHook, act} from '@testing-library/react-hooks';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {
  addCar,
  deleteCar,
  getCars,
  updateCar,
} from '../../../models/repositories/CarPostsService';
import {Car} from '../../../models/entities/Car';
import {useCarPostsService} from '../useCarPostsService';
import React, {ReactNode} from 'react';
import {waitFor} from '@testing-library/react-native';

jest.mock('../../../models/repositories/CarPostsService');

const mockGetCars = getCars as jest.Mock;
const mockAddCar = addCar as jest.Mock;
const mockUpdateCar = updateCar as jest.Mock;
const mockDeleteCar = deleteCar as jest.Mock;

const mockInvalidateQueries = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    invalidateQueries: mockInvalidateQueries,
  }),
}));

describe('useCarPostsService', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({children}: {children: ReactNode}) => {
    return React.createElement(
      QueryClientProvider,
      {client: queryClient},
      children,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('should fetch cars successfully', async () => {
    const carsMockData: Car[] = [
      {
        id: '1',
        brand: 'Toyota',
        model: 'Corolla',
        makeYear: 2020,
        userId: '1',
        gearbox: 'Automatic',
        color: 'Blue',
        photoUrl: '',
        datePosted: '2023-01-01',
      },
    ];
    mockGetCars.mockResolvedValue(carsMockData);

    const {result} = renderHook(() => useCarPostsService(), {wrapper});

    await waitFor(() =>
      expect(result.current.carData.cars).toEqual(carsMockData),
    );

    expect(result.current.carData.isCarsLoading).toBe(false);
    expect(result.current.carData.carsError).toBeNull();
    expect(mockGetCars).toHaveBeenCalledTimes(1);
  });

  it('should handle error while fetching cars', async () => {
    const errorMessage = 'Failed to fetch cars';
    mockGetCars.mockRejectedValueOnce(new Error(errorMessage));

    const {result} = renderHook(() => useCarPostsService(), {wrapper});

    await waitFor(() => expect(result.current.carData.carsError).toBeTruthy());

    expect(result.current.carData.isCarsLoading).toBe(false);
    expect(result.current.carData.carsError?.message).toBe(errorMessage);
  });

  it('should add a new car successfully', async () => {
    const newCar: Omit<Car, 'id'> = {
      brand: 'Honda',
      model: 'Civic',
      makeYear: 2022,
      userId: '1',
      gearbox: 'Manual',
      color: 'Black',
      photoUrl: '',
      datePosted: '2023-01-02',
    };
    mockAddCar.mockResolvedValue({...newCar, id: '2'});

    const {result} = renderHook(() => useCarPostsService(), {wrapper});

    await act(async () => {
      result.current.mutations.addNewCar(newCar);
    });

    expect(mockAddCar).toHaveBeenCalledWith(newCar);
    expect(mockAddCar).toHaveBeenCalledTimes(1);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['cars'],
    });
  });

  it('should update a car successfully', async () => {
    const updatedCar: Car = {
      id: '1',
      brand: 'Toyota',
      model: 'Camry',
      makeYear: 2020,
      userId: '1',
      gearbox: 'Automatic',
      color: 'Red',
      photoUrl: '',
      datePosted: '2023-01-01',
    };
    mockUpdateCar.mockResolvedValue(updatedCar);

    const {result} = renderHook(() => useCarPostsService(), {wrapper});

    await act(async () => {
      result.current.mutations.updateExistingCar(updatedCar);
    });

    expect(mockUpdateCar).toHaveBeenCalledWith(updatedCar);
    expect(mockUpdateCar).toHaveBeenCalledTimes(1);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['cars'],
    });
  });

  it('should delete a car successfully', async () => {
    const carId = '1';
    mockDeleteCar.mockResolvedValue({});

    const {result} = renderHook(() => useCarPostsService(), {wrapper});

    await act(async () => {
      result.current.mutations.deleteExistingCar(carId);
    });

    expect(mockDeleteCar).toHaveBeenCalledWith(carId);
    expect(mockDeleteCar).toHaveBeenCalledTimes(1);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['cars'],
    });
  });
});
