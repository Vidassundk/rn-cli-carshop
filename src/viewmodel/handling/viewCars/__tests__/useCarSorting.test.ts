import {renderHook, act} from '@testing-library/react-hooks';
import {useCarSorting} from '../useCarSorting';
import {Car} from '../../../../models/entities/Car';

describe('useCarSorting', () => {
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

  it('should return cars unsorted when sortBy is null (Relevance)', () => {
    const {result} = renderHook(() => useCarSorting(carsMock));

    expect(result.current.sortedCars).toEqual(carsMock);
  });

  it('should sort cars by makeYear in descending order', () => {
    const {result} = renderHook(() => useCarSorting(carsMock));

    act(() => {
      result.current.sortingFunctions.setSortBy('makeYear');
    });

    expect(result.current.sortedCars[0].makeYear).toBe(2021);
    expect(result.current.sortedCars[2].makeYear).toBe(2019);
  });

  it('should sort cars by makeYear in ascending order', () => {
    const {result} = renderHook(() => useCarSorting(carsMock));

    act(() => {
      result.current.sortingFunctions.setSortBy('makeYear');
      result.current.sortingFunctions.setSortDirection('asc');
    });

    expect(result.current.sortedCars[0].makeYear).toBe(2019);
    expect(result.current.sortedCars[2].makeYear).toBe(2021);
  });

  it('should sort cars by brand in ascending order', () => {
    const {result} = renderHook(() => useCarSorting(carsMock));

    act(() => {
      result.current.sortingFunctions.setSortBy('brand');
      result.current.sortingFunctions.setSortDirection('asc');
    });

    expect(result.current.sortedCars[0].brand).toBe('Honda');
    expect(result.current.sortedCars[2].brand).toBe('Toyota');
  });

  it('should sort cars by datePosted in descending order by default', () => {
    const {result} = renderHook(() => useCarSorting(carsMock));

    act(() => {
      result.current.sortingFunctions.setSortBy('datePosted');
    });

    expect(result.current.sortedCars[0].datePosted).toBe('2023-01-03');
    expect(result.current.sortedCars[2].datePosted).toBe('2023-01-01');
  });

  it('should handle non-existent sort fields gracefully', () => {
    const {result} = renderHook(() => useCarSorting(carsMock));

    act(() => {
      result.current.sortingFunctions.setSortBy(
        'nonExistentField' as keyof Car,
      );
    });

    expect(result.current.sortedCars).toEqual(carsMock);
  });
});
