import {useState, useEffect, useMemo} from 'react';
import {Alert} from 'react-native';
import {AddDataScreenNavigationProp} from '../../navigation/AppNavigator';
import {useAuth} from '../../context/UserContext';
import {useSupportedCarsService} from '../data/useSupportedCarService';
import {useCarPostsService} from '../data/useCarPostsService';
import {Car} from '../../models/entities/Car';
import {
  SupportedCar,
  SupportedCarModel,
} from '../../models/entities/SupportedCar';

export const useAddCarForm = (navigation: AddDataScreenNavigationProp) => {
  const {userId} = useAuth();
  const {
    mutations: {addNewCar},
  } = useCarPostsService();
  const {
    supportedBrandsAndModels: {
      supportedCarBrandsAndModels,
      isBrandsLoading,
      brandsError,
    },
  } = useSupportedCarsService();

  const [carData, setCarData] = useState<{
    brand: Car['brand'] | null;
    model: Car['model'] | null;
    makeYear: Car['makeYear'] | null;
    gearbox: Car['gearbox'] | null;
    color: Car['color'] | null;
    photoUrl: Car['photoUrl'] | null;
  }>({
    brand: null,
    model: null,
    makeYear: null,
    gearbox: null,
    color: null,
    photoUrl: null,
  });

  const [modalVisible, setModalVisible] = useState<{
    brand: boolean;
    model: boolean;
    gearbox: boolean;
    color: boolean;
    year: boolean;
  }>({
    brand: false,
    model: false,
    gearbox: false,
    color: false,
    year: false,
  });

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({length: 20}, (_, i) => currentYear - i);
  }, []);

  useEffect(() => {
    if (carData.brand && !carData.model) {
      const brand = supportedCarBrandsAndModels?.find(
        (b: SupportedCar) => b.brand === carData.brand,
      );
      if (brand) {
        setCarData(prev => ({...prev, photoUrl: brand.brandImage}));
      }
    } else if (carData.brand && carData.model) {
      const brand = supportedCarBrandsAndModels?.find(
        (b: SupportedCar) => b.brand === carData.brand,
      );
      const model = brand?.models.find(
        (m: SupportedCarModel) => m.name === carData.model,
      );
      if (model) {
        setCarData(prev => ({...prev, photoUrl: model.image}));
      }
    }
  }, [carData.brand, carData.model, supportedCarBrandsAndModels]);

  useEffect(() => {
    setCarData(prev => ({...prev, model: null}));
  }, [carData.brand]);

  const updateCarData = <K extends keyof typeof carData>(
    key: K,
    value: (typeof carData)[K],
  ) => {
    setCarData(prev => ({...prev, [key]: value}));
  };

  const validateForm = () => {
    const {brand, model, makeYear, gearbox, color} = carData;
    if (!brand || !model || !makeYear || !gearbox || !color) {
      Alert.alert('Error', 'Please fill out all fields');
      return false;
    }
    return true;
  };

  const handleAddCar = async () => {
    if (!validateForm()) {return;}

    const {brand, model, makeYear, gearbox, color, photoUrl} = carData;

    const newCar: Car = {
      id: Math.random().toString(36).substring(2, 8),
      userId: userId!,
      brand: brand!,
      model: model!,
      makeYear: makeYear!,
      gearbox: gearbox!,
      color: color!,
      photoUrl: photoUrl ?? '',
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

  return {
    formData: {
      carData,
      updateCarData,
      modalVisible,
      setModalVisible,
    },
    formActions: {
      handleAddCar,
      validateForm,
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
