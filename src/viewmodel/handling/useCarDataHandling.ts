import {useCarFilters} from './useCarFilters';
import {useCarSorting} from './useCarSorting';
import {useCarSearch} from './useCarSearch';
import {useCarPostsService} from '../data/useCarPostsService';
import {useAuth} from '../../context/UserContext';

export const useCarDataHandling = () => {
  const {carData} = useCarPostsService();
  const {cars, refetchCars, isCarsLoading, carsError} = carData;
  const {userId} = useAuth();

  // Apply filters and generate dynamic filter options
  const {filteredCars, filters, filterFunctions, filterOptions} = useCarFilters(
    cars,
    userId,
  );

  // Apply search on top of filtered results
  const {searchedCars, setSearchQuery} = useCarSearch(filteredCars);

  // Apply sorting on top of searched results
  const {sortedCars, sortingFunctions, sorts} = useCarSorting(searchedCars);

  // Add isUserCar field
  const carsWithUserTag = sortedCars.map(car => ({
    ...car,
    isUserCar: car.userId === userId,
  }));

  return {
    cars: carsWithUserTag,
    filters: {
      filters,
      filterFunctions,
      filterOptions,
    },
    sorting: {
      sortingFunctions,
      sorts,
    },
    search: {
      setSearchQuery,
    },
    status: {
      refetchCars,
      isCarsLoading,
      carsError,
    },
  };
};
