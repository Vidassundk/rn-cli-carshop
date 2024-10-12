import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getCars, addCar, updateCar, deleteCar} from '../services/carService';
import {Car} from '../models/Car';

export const useCars = () => {
  const queryClient = useQueryClient();

  const {
    data: cars,
    isLoading,
    error,
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
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
  });

  return {
    cars,
    isLoading,
    error,
    addNewCar,
    updateExistingCar,
    deleteExistingCar,
    addCarMutationStatus,
    updateCarMutationStatus,
    deleteCarMutationStatus,
  };
};
