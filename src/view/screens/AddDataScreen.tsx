import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useCarService} from '../../viewmodel/useCarService';
import {useAuth} from '../../context/UserContext';
import FilterModal from '../components/FilterModal';
import {carColors} from '../../models/constants/carColors';
import {GearboxOption} from '../../viewmodel/types/carDataHandlingTypes';
import {Car} from '../../models/entities/Car';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type AddDataScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddDataScreen'
>;

interface AddDataScreenProps {
  navigation: AddDataScreenNavigationProp;
}

const AddDataScreen: React.FC<AddDataScreenProps> = ({navigation}) => {
  const {userId} = useAuth();
  const {
    mutations: {addNewCar},
    supportedBrandsAndModels: {
      supportedCarBrandsAndModels,
      isBrandsLoading,
      brandsError,
    },
  } = useCarService();

  // State for car properties
  const [carData, setCarData] = useState({
    brand: null as Car['brand'] | null,
    model: null as string | null,
    makeYear: null as string | null,
    gearbox: null as GearboxOption | null,
    color: null as string | null,
  });

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState({
    brand: false,
    model: false,
    gearbox: false,
    color: false,
    year: false,
  });

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({length: 21}, (_, i) => currentYear - i);

  // Reset model when brand changes
  useEffect(() => {
    setCarData(prev => ({...prev, model: null}));
  }, [carData.brand]);

  // Function to handle adding a new car
  const handleAddCar = async () => {
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

  // Helper function to update car data
  const updateCarData = (key: keyof typeof carData, value: any) => {
    setCarData(prev => ({...prev, [key]: value}));
  };

  // Render loading and error states for brands
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

  const filteredModels =
    supportedCarBrandsAndModels?.find(item => item.brand === carData.brand)
      ?.models || [];

  return (
    <View style={styles.container}>
      {/* Brand Selection */}
      <Text style={styles.label}>Brand</Text>
      <TouchableOpacity
        style={styles.modalTrigger}
        onPress={() => setModalVisible({...modalVisible, brand: true})}>
        <Text>{carData.brand || 'Select Brand'}</Text>
      </TouchableOpacity>

      {supportedCarBrandsAndModels && (
        <FilterModal
          visible={modalVisible.brand}
          options={supportedCarBrandsAndModels.map(item => ({
            label: item.brand,
            value: item.brand,
          }))}
          selectedValue={carData.brand}
          onValueChange={value => updateCarData('brand', value)}
          onRequestClose={() =>
            setModalVisible({...modalVisible, brand: false})
          }
        />
      )}

      {/* Model Selection */}
      <Text style={styles.label}>Model</Text>
      <TouchableOpacity
        style={styles.modalTrigger}
        onPress={() => setModalVisible({...modalVisible, model: true})}
        disabled={!carData.brand}>
        <Text>
          {carData.model ||
            (carData.brand ? 'Select Model' : 'Select Brand First')}
        </Text>
      </TouchableOpacity>

      <FilterModal
        visible={modalVisible.model}
        options={filteredModels.map(model => ({
          label: model,
          value: model,
        }))}
        selectedValue={carData.model}
        onValueChange={value => updateCarData('model', value)}
        onRequestClose={() => setModalVisible({...modalVisible, model: false})}
      />

      {/* Year Selection */}
      <Text style={styles.label}>Year</Text>
      <TouchableOpacity
        style={styles.modalTrigger}
        onPress={() => setModalVisible({...modalVisible, year: true})}>
        <Text>{carData.makeYear || 'Select Year'}</Text>
      </TouchableOpacity>

      <FilterModal
        visible={modalVisible.year}
        options={yearRange.map(year => ({
          label: year.toString(),
          value: year.toString(),
        }))}
        selectedValue={carData.makeYear}
        onValueChange={value => updateCarData('makeYear', value)}
        onRequestClose={() => setModalVisible({...modalVisible, year: false})}
      />

      {/* Gearbox Selection */}
      <Text style={styles.label}>Gearbox</Text>
      <TouchableOpacity
        style={styles.modalTrigger}
        onPress={() => setModalVisible({...modalVisible, gearbox: true})}>
        <Text>{carData.gearbox || 'Select Gearbox'}</Text>
      </TouchableOpacity>

      <FilterModal
        visible={modalVisible.gearbox}
        options={[
          {label: 'Automatic', value: 'Automatic'},
          {label: 'Manual', value: 'Manual'},
        ]}
        selectedValue={carData.gearbox}
        onValueChange={value => updateCarData('gearbox', value)}
        onRequestClose={() =>
          setModalVisible({...modalVisible, gearbox: false})
        }
      />

      {/* Color Selection */}
      <Text style={styles.label}>Color</Text>
      <TouchableOpacity
        style={styles.modalTrigger}
        onPress={() => setModalVisible({...modalVisible, color: true})}>
        <Text>{carData.color || 'Select Color'}</Text>
      </TouchableOpacity>

      <FilterModal
        visible={modalVisible.color}
        options={carColors.map(color => ({
          label: color,
          value: color,
        }))}
        selectedValue={carData.color}
        onValueChange={value => updateCarData('color', value)}
        onRequestClose={() => setModalVisible({...modalVisible, color: false})}
      />

      {/* Submit Button */}
      <Button title="Add Car" onPress={handleAddCar} />
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
