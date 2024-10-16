import {renderHook, act} from '@testing-library/react-hooks';
import {useCarSearch} from '../useCarSearch';
import {Car} from '../../../../models/entities/Car';

describe('useCarSearch', () => {
  const carsMock: Car[] = [
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
    {
      id: '3',
      brand: 'Toyota',
      model: 'Camry',
      makeYear: 2019,
      userId: '1',
      gearbox: 'Automatic',
      color: 'Red',
      photoUrl: '',
      datePosted: '2023-01-03',
    },
  ];

  it('should return all cars when search query is empty', () => {
    const {result} = renderHook(() => useCarSearch(carsMock));

    expect(result.current.searchedCars).toEqual(carsMock);
  });

  it('should filter cars by brand', () => {
    const {result} = renderHook(() => useCarSearch(carsMock));

    act(() => {
      result.current.setSearchQuery('Toyota');
    });

    expect(result.current.searchedCars.length).toBe(2);
    expect(result.current.searchedCars[0].brand).toBe('Toyota');
  });

  it('should filter cars by model and brand', () => {
    const {result} = renderHook(() => useCarSearch(carsMock));

    act(() => {
      result.current.setSearchQuery('Toyota Camry');
    });

    expect(result.current.searchedCars.length).toBe(1);
    expect(result.current.searchedCars[0].model).toBe('Camry');
  });

  it('should filter cars by makeYear', () => {
    const {result} = renderHook(() => useCarSearch(carsMock));

    act(() => {
      result.current.setSearchQuery('2021');
    });

    expect(result.current.searchedCars.length).toBe(1);
    expect(result.current.searchedCars[0].makeYear).toBe(2021);
  });

  it('should filter cars by multiple search terms', () => {
    const {result} = renderHook(() => useCarSearch(carsMock));

    act(() => {
      result.current.setSearchQuery('Manual Black 2021');
    });

    expect(result.current.searchedCars.length).toBe(1);
    expect(result.current.searchedCars[0].model).toBe('Civic');
  });

  it('should return no cars if search query does not match', () => {
    const {result} = renderHook(() => useCarSearch(carsMock));

    act(() => {
      result.current.setSearchQuery('Tesla');
    });

    expect(result.current.searchedCars.length).toBe(0);
  });
});
