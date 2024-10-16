import {useEffect} from 'react';
import {CarForm} from './useAddCarForm';
import {SupportedCar} from '../../../models/entities/SupportedCar';

export const useCarImageUpdater = (
  carData: CarForm,
  setCarData: React.Dispatch<React.SetStateAction<CarForm>>,
  supportedCarBrandsAndModels: SupportedCar[] | undefined,
) => {
  useEffect(() => {
    if (carData.brand && !carData.model) {
      const brand = supportedCarBrandsAndModels?.find(
        b => b.brand === carData.brand,
      );
      if (brand) {
        setCarData(prev => ({...prev, photoUrl: brand.brandImage}));
      }
    } else if (carData.brand && carData.model) {
      const brand = supportedCarBrandsAndModels?.find(
        b => b.brand === carData.brand,
      );
      const model = brand?.models.find(m => m.name === carData.model);
      if (model) {
        setCarData(prev => ({...prev, photoUrl: model?.image || null}));
      }
    }
  }, [carData.brand, carData.model, supportedCarBrandsAndModels, setCarData]);
};
