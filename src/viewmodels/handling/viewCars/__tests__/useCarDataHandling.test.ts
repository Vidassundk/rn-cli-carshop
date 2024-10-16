import {renderHook, act} from '@testing-library/react-hooks';
import {useCarDataHandling} from '../useCarDataHandling';
import {useCarPostsService} from '../../../data/useCarPostsService';
import {useAuth} from '../../../context/UserContext';

jest.mock('../../../data/useCarPostsService');
jest.mock('../../../context/UserContext');

const mockUseCarPostsService = useCarPostsService as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

describe('useCarDataHandling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const carsMock = [
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
    {
      id: '2',
      brand: 'Honda',
      model: 'Civic',
      makeYear: 2021,
      userId: '2',
      gearbox: 'Manual',
      color: 'Black',
      photoUrl: '',
      datePosted: '2023-01-02',
    },
  ];

  it('should return cars with correct isUserCar flag', () => {
    mockUseCarPostsService.mockReturnValue({
      carData: {
        cars: carsMock,
        refetchCars: jest.fn(),
        isCarsLoading: false,
        carsError: null,
      },
    });

    mockUseAuth.mockReturnValue({userId: '1'});

    const {result} = renderHook(() => useCarDataHandling());

    const cars = result.current.cars;

    expect(cars[0].isUserCar).toBe(true);
    expect(cars[1].isUserCar).toBe(false);
  });

  it('should propagate filters, search, and sorting', () => {
    mockUseCarPostsService.mockReturnValue({
      carData: {
        cars: carsMock,
        refetchCars: jest.fn(),
        isCarsLoading: false,
        carsError: null,
      },
    });

    mockUseAuth.mockReturnValue({userId: '1'});

    const {result} = renderHook(() => useCarDataHandling());

    act(() => {
      result.current.filters.filterFunctions.setFilterBrand('Toyota');
      result.current.search.setSearchQuery('Corolla');
      result.current.sorting.sortingFunctions.setSortBy('makeYear');
    });

    const cars = result.current.cars;

    expect(cars.length).toBe(1);
    expect(cars[0].brand).toBe('Toyota');
    expect(cars[0].model).toBe('Corolla');
  });

  it('should handle loading and error states', () => {
    mockUseCarPostsService.mockReturnValue({
      carData: {
        cars: [],
        refetchCars: jest.fn(),
        isCarsLoading: true,
        carsError: new Error('Failed to load cars'),
      },
    });

    mockUseAuth.mockReturnValue({userId: '1'});

    const {result} = renderHook(() => useCarDataHandling());

    expect(result.current.status.isCarsLoading).toBe(true);

    expect(result.current.status.carsError).toEqual(
      new Error('Failed to load cars'),
    );
  });

  it('should refetch cars on demand', () => {
    const refetchCarsMock = jest.fn();
    mockUseCarPostsService.mockReturnValue({
      carData: {
        cars: carsMock,
        refetchCars: refetchCarsMock,
        isCarsLoading: false,
        carsError: null,
      },
    });

    mockUseAuth.mockReturnValue({userId: '1'});

    const {result} = renderHook(() => useCarDataHandling());

    act(() => {
      result.current.status.refetchCars();
    });

    expect(refetchCarsMock).toHaveBeenCalledTimes(1);
  });
});
