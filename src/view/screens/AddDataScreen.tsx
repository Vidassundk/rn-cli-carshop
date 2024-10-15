import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FilterModal from '../components/FilterModal';
import {useAddCarViewModel} from '../../viewmodel/useAddCarViewModel';
import {useAddCarConfig} from '../../viewmodel/useAddCarConfig';
import {AddDataScreenProps} from '../../navigation/AppNavigator';
import {useAuth} from '../../context/UserContext';
import {
  CarDataFormTypes,
  ModalVisibility,
} from '../../viewmodel/types/carDataAddingTypes';

const AddDataScreen: React.FC<AddDataScreenProps> = ({navigation}) => {
  const {userId} = useAuth();

  const {
    carData,
    modalVisible,
    setModalVisible,
    updateCarData,
    handleAddCar,
    yearRange,
    filteredModels,
    isBrandsLoading,
    brandsError,
    supportedCarBrandsAndModels,
  } = useAddCarViewModel(userId);

  const modalKeyToFormKeyMap: {
    [key in keyof ModalVisibility]: keyof CarDataFormTypes;
  } = {
    brand: 'brand',
    model: 'model',
    year: 'makeYear',
    gearbox: 'gearbox',
    color: 'color',
  };

  const modalConfigs = useAddCarConfig({
    carData,
    filteredModels,
    yearRange,
    supportedCarBrandsAndModels: supportedCarBrandsAndModels || [],
    modalVisible,
    setModalVisible,
    updateCarData,
  });

  if (isBrandsLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading car brands...</Text>
      </View>
    );
  }

  if (brandsError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Error loading car brands: {brandsError.message}
        </Text>
      </View>
    );
  }

  const renderModals = () => {
    return modalConfigs.map(config => {
      const formKey = modalKeyToFormKeyMap[config.modalKey];

      return (
        <View key={config.modalKey}>
          <Text style={styles.label}>{config.label}</Text>
          <TouchableOpacity
            style={styles.modalTrigger}
            onPress={() =>
              setModalVisible({...modalVisible, [config.modalKey]: true})
            }
            disabled={config.disabled}>
            <Text>{config.value || `Select ${config.label}`}</Text>
          </TouchableOpacity>

          <FilterModal
            visible={modalVisible[config.modalKey]}
            options={config.options}
            selectedValue={config.value}
            onValueChange={value => updateCarData(formKey, value)}
            onRequestClose={() =>
              setModalVisible({...modalVisible, [config.modalKey]: false})
            }
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {renderModals()}
      <Button title="Add Car" onPress={() => handleAddCar(navigation)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalTrigger: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default AddDataScreen;
