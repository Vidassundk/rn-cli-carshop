import {useQuery} from '@tanstack/react-query';
import {getSupportedCarBrandsAndModels} from '../../models/repositories/SupportedCarsService';
import {SupportedCar} from '../../models/entities/SupportedCar';

export const useSupportedCarsService = () => {
  const {
    data: supportedCarBrandsAndModels,
    isLoading: isBrandsLoading,
    error: brandsError,
    refetch: refetchBrandsAndModels,
  } = useQuery<SupportedCar[]>({
    queryKey: ['supportedCarBrandsAndModels'],
    queryFn: getSupportedCarBrandsAndModels,
  });

  return {
    supportedBrandsAndModels: {
      supportedCarBrandsAndModels,
      isBrandsLoading,
      brandsError,
      refetchBrandsAndModels,
    },
  };
};
