import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useAuth} from '../../context/UserContext';
import {useSupportedCarsService} from '../../data/useSupportedCarService';
import {useCarPostsService} from '../../data/useCarPostsService';
import {Car} from '../../../models/entities/Car';
import {useYearOptions} from '../../../utils/hooks/useYearOptions';
import {useCarImageUpdater} from './useCarImageUpdater';
import {useCarValidation} from './useCarValidation';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/AppNavigator';

export type CarForm = {
  brand: string | null;
  model: string | null;
  makeYear: number | null;
  gearbox: 'Automatic' | 'Manual' | null;
  color: string | null;
  photoUrl: string | null;
};

export const useAddCarForm = (
  navigation: NavigationProp<RootStackParamList>,
) => {
  const {userId} = useAuth();
  const {addNewCar} = useCarPostsService().mutations;
  const {supportedCarBrandsAndModels, isBrandsLoading, brandsError} =
    useSupportedCarsService().supportedBrandsAndModels;

  const [carData, setCarData] = useState<CarForm>({
    brand: null,
    model: null,
    makeYear: null,
    gearbox: null,
    color: null,
    photoUrl: null,
  });

  const yearOptions = useYearOptions();
  useCarImageUpdater(carData, setCarData, supportedCarBrandsAndModels);

  const {validateCarForm} = useCarValidation(carData);

  const updateCarData = <K extends keyof CarForm>(
    key: K,
    value: CarForm[K],
  ) => {
    setCarData(prev => ({...prev, [key]: value}));
  };

  const handleAddCar = async () => {
    if (!validateCarForm()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const newCar: Car = {
      id: Math.random().toString(36).substring(2, 8),
      userId: userId!,
      brand: carData.brand!,
      model: carData.model!,
      makeYear: carData.makeYear!,
      gearbox: carData.gearbox!,
      color: carData.color!,
      photoUrl: carData.photoUrl ?? '',
      datePosted: new Date().toISOString().split('T')[0],
    };

    try {
      await addNewCar(newCar);
      Alert.alert('Success', 'Car added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add the car');
    }
  };

  useEffect(() => {
    if (carData.brand) {
      const selectedBrandModels =
        supportedCarBrandsAndModels
          ?.find(brand => brand.brand === carData.brand)
          ?.models.map(model => model.name) || [];

      if (!selectedBrandModels.includes(carData.model?.toString() || '')) {
        updateCarData('model', null);
      }
    }
  }, [carData.brand, carData.model, supportedCarBrandsAndModels]);

  return {
    formData: {
      carData,
      updateCarData,
    },
    formActions: {
      handleAddCar,
    },
    options: {
      yearOptions,
      supportedCarBrandsAndModels,
    },
    status: {
      isBrandsLoading,
      brandsError,
    },
  };
};
