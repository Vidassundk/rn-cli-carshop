import {useCarFilters} from './useCarFilters';
import {useCarSorting} from './useCarSorting';
import {useCarSearch} from './useCarSearch';
import {useCarPostsService} from '../../data/useCarPostsService';
import {useAuth} from '../../context/UserContext';

export const useCarDataHandling = () => {
  const {carData} = useCarPostsService();
  const {cars, refetchCars, isCarsLoading, carsError} = carData;
  const {userId} = useAuth();

  const {filteredCars, filters, filterFunctions, filterOptions} = useCarFilters(
    cars,
    userId,
  );

  const {searchedCars, setSearchQuery} = useCarSearch(filteredCars);

  const {sortedCars, sortingFunctions, sorts} = useCarSorting(searchedCars);

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
