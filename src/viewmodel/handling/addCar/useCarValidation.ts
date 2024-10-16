import {Alert} from 'react-native';
import {CarForm} from './useAddCarForm';

export const useCarValidation = (carData: CarForm) => {
  const validateCarForm = (): boolean => {
    const {brand, model, makeYear, gearbox, color} = carData;

    if (!brand || !model || !makeYear || !gearbox || !color) {
      Alert.alert('Error', 'Please fill out all fields');
      return false;
    }
    return true;
  };

  return {validateCarForm};
};
