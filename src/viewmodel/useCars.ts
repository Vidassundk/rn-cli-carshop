import {useCarDataHandling} from './useCarDataHandling';
import {User} from '../models/entities/User';
import {useCarService} from './useCarService';

interface UseCarsProps {
  userId?: User['userId'];
}

export const useCars = ({userId}: UseCarsProps = {userId: undefined}) => {
  const {
    carData: {cars, isCarsLoading, carsError, refetchCars},

    mutations: {addNewCar, updateExistingCar, deleteExistingCar},
  } = useCarService();

  const {
    filteredCars,
    filterOptions,
    filters,
    filterFunctions,
    sorting,
    sortingFunctions,
  } = useCarDataHandling(cars, userId);

  const isCarOwner = (carId: string) => {
    const car = cars?.find(singleCar => singleCar.id === carId);
    return car?.userId === userId;
  };

  return {
    cars: filteredCars,
    dataHandling: {
      filterOptions,
      filters,
      filterFunctions,
      sorting,
      sortingFunctions,
    },
    serverFunctions: {
      refetchCars,
      addNewCar,
      updateExistingCar,
      deleteExistingCar,
    },
    isCarOwner,
    isCarsLoading,
    carsError,
  };
};
