import {useCarService} from './useCarService';
import {useCarFilters} from './useCarFilters';
import {useCarSorting} from './useCarSorting';
import {useAuth} from '../context/UserContext';
import {Car} from '../models/entities/Car';

export const useCars = () => {
  const {userId} = useAuth();

  const {
    cars,
    isLoading,
    error,
    refetch,
    addNewCar,
    updateExistingCar,
    deleteExistingCar,
  } = useCarService();

  const {sortBy, setSortBy, sortDirection, setSortDirection} = useCarSorting();

  const {
    filteredCars,
    brandOptions,
    modelOptions,
    yearOptions,
    filterBrand,
    setFilterBrand,
    filterModel,
    setFilterModel,
    filterYearFrom,
    setFilterYearFrom,
    filterYearTo,
    setFilterYearTo,
    filterGearbox,
    setFilterGearbox,
    filterColor,
    setFilterColor,
    gearboxOptions,
    colorOptions,
    showOnlyUserCars,
    setShowOnlyUserCars,
  } = useCarFilters(cars, sortBy, sortDirection);

  const isCarOwner = (carId: Car['id']) => {
    const car = cars?.find(singleCar => singleCar.id === carId);
    return car?.userId === userId;
  };

  return {
    cars: filteredCars,
    filterOptions: {
      brandOptions,
      modelOptions,
      yearOptions,
      gearboxOptions,
      colorOptions,
    },
    filters: {
      filterBrand,
      setFilterBrand,
      filterModel,
      setFilterModel,
      filterYearFrom,
      setFilterYearFrom,
      filterYearTo,
      setFilterYearTo,
      filterGearbox,
      setFilterGearbox,
      filterColor,
      setFilterColor,
    },
    sorting: {
      sortBy,
      setSortBy,
      sortDirection,
      setSortDirection,
    },

    showOnlyUserCars,
    setShowOnlyUserCars,
    isLoading,
    error,
    refetch,
    addNewCar,
    updateExistingCar,
    deleteExistingCar,
    isCarOwner,
  };
};
