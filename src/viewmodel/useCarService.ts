import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
} from '../models/repositories/carService';
import {Car} from '../models/entities/Car';

export const useCarService = () => {
  const queryClient = useQueryClient();

  const {
    data: cars,
    isLoading,
    error,
    refetch,
  } = useQuery<Car[]>({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  const {mutate: addNewCar, ...addCarMutationStatus} = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
  });

  const {mutate: updateExistingCar, ...updateCarMutationStatus} = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
  });

  const {mutate: deleteExistingCar, ...deleteCarMutationStatus} = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      console.log('Car deleted successfully');
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
    onError: errorMessage => {
      console.error('Error deleting car:', errorMessage);
    },
  });

  return {
    cars,
    isLoading,
    error,
    refetch,
    addNewCar,
    updateExistingCar,
    deleteExistingCar,
    addCarMutationStatus,
    updateCarMutationStatus,
    deleteCarMutationStatus,
  };
};
