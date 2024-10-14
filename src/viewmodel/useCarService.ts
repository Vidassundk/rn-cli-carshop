import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  getSupportedCarBrandsAndModels,
} from '../models/repositories/carService';
import {Car} from '../models/entities/Car';

export const useCarService = () => {
  const queryClient = useQueryClient();

  // Fetch car list
  const {
    data: cars,
    isLoading: isCarsLoading,
    error: carsError,
    refetch: refetchCars,
  } = useQuery<Car[]>({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  // Fetch supported car brands and models
  const {
    data: supportedCarBrandsAndModels,
    isLoading: isBrandsLoading,
    error: brandsError,
    refetch: refetchBrandsAndModels,
  } = useQuery({
    queryKey: ['supportedCarBrandsAndModels'],
    queryFn: getSupportedCarBrandsAndModels,
  });

  // Mutations
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
    // Car data
    carData: {
      cars,
      isCarsLoading,
      carsError,
      refetchCars,
    },
    // Supported brands and models
    supportedBrandsAndModels: {
      supportedCarBrandsAndModels,
      isBrandsLoading,
      brandsError,
      refetchBrandsAndModels,
    },
    // Mutation functions
    mutations: {
      addNewCar,
      updateExistingCar,
      deleteExistingCar,
    },
  };
};
