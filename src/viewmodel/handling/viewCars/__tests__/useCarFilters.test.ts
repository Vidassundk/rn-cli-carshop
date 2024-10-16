import {renderHook, act} from '@testing-library/react-hooks';
import {useCarFilters} from '../useCarFilters';
import {Car} from '../../../../models/entities/Car';

describe('useCarFilters', () => {
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

  it('should filter cars by brand', () => {
    const {result} = renderHook(() => useCarFilters(carsMock, '1'));

    act(() => {
      result.current.filterFunctions.setFilterBrand('Toyota');
    });

    expect(result.current.filteredCars.length).toBe(2);
    expect(result.current.filters.filterBrand).toBe('Toyota');
  });

  it('should filter cars by model', () => {
    const {result} = renderHook(() => useCarFilters(carsMock, '1'));

    act(() => {
      result.current.filterFunctions.setFilterModel('Corolla');
    });

    expect(result.current.filteredCars.length).toBe(1);
    expect(result.current.filters.filterModel).toBe('Corolla');
  });

  it('should filter cars by year range', () => {
    const {result} = renderHook(() => useCarFilters(carsMock, '1'));

    act(() => {
      result.current.filterFunctions.setFilterYearFrom(2020);
      result.current.filterFunctions.setFilterYearTo(2021);
    });

    expect(result.current.filteredCars.length).toBe(2);
  });

  it('should filter cars by gearbox', () => {
    const {result} = renderHook(() => useCarFilters(carsMock, '1'));

    act(() => {
      result.current.filterFunctions.setFilterGearbox('Automatic');
    });

    expect(result.current.filteredCars.length).toBe(2);
    expect(result.current.filters.filterGearbox).toBe('Automatic');
  });

  it('should reset filters', () => {
    const {result} = renderHook(() => useCarFilters(carsMock, '1'));

    act(() => {
      result.current.filterFunctions.setFilterBrand('Toyota');
      result.current.filterFunctions.resetFilters();
    });

    expect(result.current.filteredCars.length).toBe(3);
    expect(result.current.filters.filterBrand).toBe('');
  });
});
