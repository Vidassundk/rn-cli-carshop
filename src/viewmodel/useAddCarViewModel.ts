import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useCarService} from './useCarService';
import {User} from '../models/entities/User';

import {AddDataScreenNavigationProp} from '../navigation/AppNavigator';

import {CarDataFormTypes, ModalVisibility} from './types/carDataAddingTypes';

export const useAddCarViewModel = (userId: User['userId']) => {
  const {
    mutations: {addNewCar},
    supportedBrandsAndModels: {
      supportedCarBrandsAndModels,
      isBrandsLoading,
      brandsError,
    },
  } = useCarService();

  const [carData, setCarData] = useState<CarDataFormTypes>({
    brand: null,
    model: null,
    makeYear: null,
    gearbox: null,
    color: null,
  });

  const [modalVisible, setModalVisible] = useState<ModalVisibility>({
    brand: false,
    model: false,
    gearbox: false,
    color: false,
    year: false,
  });

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({length: 21}, (_, i) => currentYear - i);

  useEffect(() => {
    setCarData(prev => ({...prev, model: null}));
  }, [carData.brand]);

  const updateCarData = <K extends keyof CarDataFormTypes>(
    key: K,
    value: CarDataFormTypes[K],
  ) => {
    setCarData(prev => ({...prev, [key]: value}));
  };

  const handleAddCar = async (navigation: AddDataScreenNavigationProp) => {
    const {brand, model, makeYear, gearbox, color} = carData;

    if (!brand || !model || !makeYear || !gearbox || !color) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const newCar = {
      id: Math.random().toString(36).substring(2, 8),
      userId: userId,
      brand,
      model,
      makeYear: Number(makeYear),
      gearbox,
      color,
      photoUrl:
        'https://images.unsplash.com/photo-1677764822934-7c9a3d1cb768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQwMTR8MHwxfHNlYXJjaHwxfHxTa29kYSUyME9jdGF2aWElMjBjYXJ8ZW58MHx8fHwxNzI4NzQxNTc4fDA&ixlib=rb-4.0.3&q=80&w=1080',
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
    carData,
    setCarData,
    modalVisible,
    setModalVisible,
    updateCarData,
    currentYear,
    yearRange,
    filteredModels:
      supportedCarBrandsAndModels?.find(item => item.brand === carData.brand)
        ?.models || [],
    isBrandsLoading,
    brandsError,
    supportedCarBrandsAndModels,
    handleAddCar,
  };
};
