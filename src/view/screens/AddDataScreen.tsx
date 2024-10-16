import React, {useState} from 'react';
import {View, Button, Image, ScrollView, StyleSheet} from 'react-native';
import {useAddCarForm} from '../../viewmodel/handling/addCar/useAddCarForm';
import {AddDataScreenProps} from '../../navigation/AppNavigator';
import {LoadingState, ErrorState} from '../components/StatusComponents';
import PickerField from '../components/PickerField';
import {carColors} from '../../models/constants/carColors'; // Import carColors

const AddDataScreen: React.FC<AddDataScreenProps> = ({navigation}) => {
  const {
    formData: {carData, updateCarData},
    formActions: {handleAddCar},
    status: {isBrandsLoading, brandsError},
    options: {supportedCarBrandsAndModels, yearOptions},
  } = useAddCarForm(navigation);

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

  if (isBrandsLoading) {
    return <LoadingState />;
  }
  if (brandsError) {
    return <ErrorState error={brandsError} />;
  }

  if (!supportedCarBrandsAndModels) {
    return <ErrorState error={new Error('No car brands available')} />;
  }

  const getModelOptions = () => {
    return [
      {label: 'Select model', value: 'Select Model'}, // No-value option
      ...(supportedCarBrandsAndModels
        .find(brand => brand.brand === carData.brand)
        ?.models.map(model => ({label: model.name, value: model.name})) || []),
    ];
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Car Image */}
        <Image
          source={{uri: carData.photoUrl || undefined}}
          style={styles.image}
        />

        {/* Brand Picker */}
        <PickerField
          label="Brand"
          value={carData.brand}
          options={[
            {label: 'Select brand', value: 'Select Brand'}, // No-value option
            ...supportedCarBrandsAndModels.map(brand => ({
              label: brand.brand,
              value: brand.brand,
            })),
          ]}
          modalVisible={modalVisible.brand}
          onPress={() => setModalVisible({...modalVisible, brand: true})}
          onValueChange={value =>
            updateCarData(
              'brand',
              value === 'Select Brand' ? null : value?.toString() || null,
            )
          }
          onClose={() => setModalVisible({...modalVisible, brand: false})}
        />

        {/* Model Picker */}
        <PickerField
          label="Model"
          value={carData.model}
          options={getModelOptions()}
          modalVisible={modalVisible.model}
          onPress={() => setModalVisible({...modalVisible, model: true})}
          onValueChange={value =>
            updateCarData(
              'model',
              value === 'Select Model' ? null : value?.toString() || null,
            )
          }
          onClose={() => setModalVisible({...modalVisible, model: false})}
          disabled={!carData.brand}
        />

        {/* Year Picker */}
        <PickerField
          label="Year"
          value={carData.makeYear?.toString() || 'Select Year'}
          options={[
            {label: 'Select year', value: 'Select Year'}, // No-value option
            ...yearOptions.map(year => ({
              label: year.toString(),
              value: year.toString(),
            })),
          ]}
          modalVisible={modalVisible.year}
          onPress={() => setModalVisible({...modalVisible, year: true})}
          onValueChange={value => {
            if (typeof value === 'string') {
              updateCarData(
                'makeYear',
                value === 'Select Year' ? null : parseInt(value, 10),
              );
            }
          }}
          onClose={() => setModalVisible({...modalVisible, year: false})}
        />

        {/* Gearbox Picker */}
        <PickerField
          label="Gearbox"
          value={carData.gearbox || 'Select Gearbox'}
          options={[
            {label: 'Select gearbox', value: 'Select Gearbox'}, // No-value option
            {label: 'Automatic', value: 'Automatic'},
            {label: 'Manual', value: 'Manual'},
          ]}
          modalVisible={modalVisible.gearbox}
          onPress={() => setModalVisible({...modalVisible, gearbox: true})}
          onValueChange={value =>
            updateCarData(
              'gearbox',
              value === 'Select Gearbox'
                ? null
                : (value as 'Automatic' | 'Manual'),
            )
          }
          onClose={() => setModalVisible({...modalVisible, gearbox: false})}
        />

        {/* Color Picker */}
        <PickerField
          label="Color"
          value={carData.color || 'Select Color'}
          options={[
            {label: 'Select color', value: 'Select Color'}, // No-value option
            ...carColors.map(color => ({label: color, value: color})),
          ]}
          modalVisible={modalVisible.color}
          onPress={() => setModalVisible({...modalVisible, color: true})}
          onValueChange={value =>
            updateCarData(
              'color',
              value === 'Select Color' ? null : value?.toString() || null,
            )
          }
          onClose={() => setModalVisible({...modalVisible, color: false})}
        />

        {/* Submit Button */}
        <Button title="Add Car" onPress={handleAddCar} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 24,
    backgroundColor: 'gray',
  },
});

export default AddDataScreen;
