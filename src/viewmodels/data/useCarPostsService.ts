import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryObserverResult,
} from '@tanstack/react-query';
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
} from '../../models/repositories/CarPostsService';
import {Car} from '../../models/entities/Car';

export const useCarPostsService = () => {
  const queryClient = useQueryClient();

  const {
    data: cars,
    isLoading: isCarsLoading,
    error: carsError,
    refetch: refetchCars,
  }: QueryObserverResult<Car[], Error> = useQuery<Car[]>({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  const {mutate: addNewCar} = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
  });

  const {mutate: updateExistingCar} = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
  });

  const {mutate: deleteExistingCar} = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
  });

  return {
    carData: {
      cars,
      isCarsLoading,
      carsError,
      refetchCars,
    },
    mutations: {
      addNewCar,
      updateExistingCar,
      deleteExistingCar,
    },
  };
};
