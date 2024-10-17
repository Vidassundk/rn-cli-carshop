import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Button,
  Animated,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {useAddCarForm} from '@/viewmodels/handling/addCar/useAddCarForm';
import PickerField from '@/views/components/PickerField';
import {carColors} from '@/models/constants/carColors';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import Loader from '@/views/components/Loader';
import ThemedText from '@/views/components/ThemedText';
import {useTheme} from '@/viewmodels/context/ThemeContext';

const AnimatedCarImage: React.FC<{
  photoUrl: string | null;
  imageHeight: any;
  imageOpacity: any;
}> = ({photoUrl, imageHeight, imageOpacity}) => {
  return (
    <Animated.View
      testID="animated-image"
      style={{height: imageHeight, opacity: imageOpacity}}>
      <Image
        source={{uri: photoUrl || undefined}}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

type AddDataScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'AddDataScreen'
>;

const AddDataScreen: React.FC<AddDataScreenNavigationProp> = ({navigation}) => {
  const {
    formData: {carData, updateCarData},
    formActions: {handleAddCar},
    status: {isBrandsLoading, brandsError},
    options: {supportedCarBrandsAndModels, yearOptions},
  } = useAddCarForm(navigation);

  const {spacing} = useTheme();
  const [modalVisible, setModalVisible] = useState({
    brand: false,
    model: false,
    gearbox: false,
    color: false,
    year: false,
  });

  const imageHeight = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const animateImage = useCallback(
    (photoUrl: string | null) => {
      Animated.parallel([
        Animated.timing(imageHeight, {
          toValue: photoUrl ? 200 : 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(imageOpacity, {
          toValue: photoUrl ? 1 : 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    },
    [imageHeight, imageOpacity],
  );

  useEffect(() => {
    animateImage(carData.photoUrl);
  }, [carData.photoUrl, animateImage]);

  if (isBrandsLoading) {
    return <Loader />;
  }
  if (brandsError) {
    return <ThemedText>{brandsError.message}</ThemedText>;
  }
  if (!supportedCarBrandsAndModels) {
    return <ThemedText>Error: No car brands available</ThemedText>;
  }

  const getModelOptions = () => {
    return [
      {label: 'Select model', value: 'Select Model'},
      ...(supportedCarBrandsAndModels
        .find(brand => brand.brand === carData.brand)
        ?.models.map(model => ({label: model.name, value: model.name})) || []),
    ];
  };

  const handleModalOpen = (field: keyof typeof modalVisible) => {
    setModalVisible({...modalVisible, [field]: true});
  };

  const handleModalClose = (field: keyof typeof modalVisible) => {
    setModalVisible({...modalVisible, [field]: false});
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, {padding: spacing.lg}]}>
        <View style={{marginBottom: spacing.md}}>
          <AnimatedCarImage
            photoUrl={carData.photoUrl}
            imageHeight={imageHeight}
            imageOpacity={imageOpacity}
          />
        </View>

        <PickerField
          label="Brand"
          value={carData.brand}
          options={[
            {label: 'Select brand', value: 'Select Brand'},
            ...supportedCarBrandsAndModels.map(brand => ({
              label: brand.brand,
              value: brand.brand,
            })),
          ]}
          modalVisible={modalVisible.brand}
          onPress={() => handleModalOpen('brand')}
          onValueChange={value =>
            updateCarData(
              'brand',
              value === 'Select Brand' ? null : value?.toString() || null,
            )
          }
          onClose={() => handleModalClose('brand')}
        />

        <PickerField
          label="Model"
          value={carData.model}
          options={getModelOptions()}
          modalVisible={modalVisible.model}
          onPress={() => handleModalOpen('model')}
          onValueChange={value =>
            updateCarData(
              'model',
              value === 'Select Model' ? null : value?.toString() || null,
            )
          }
          onClose={() => handleModalClose('model')}
          disabled={!carData.brand}
        />

        <PickerField
          label="Year"
          value={carData.makeYear?.toString() || 'Select Year'}
          options={[
            {label: 'Select year', value: 'Select Year'},
            ...yearOptions.map(year => ({
              label: year.toString(),
              value: year.toString(),
            })),
          ]}
          modalVisible={modalVisible.year}
          onPress={() => setModalVisible({...modalVisible, year: true})}
          onValueChange={value => {
            updateCarData(
              'makeYear',
              value === 'Select Year' ? null : parseInt(value as string, 10),
            );
          }}
          onClose={() => setModalVisible({...modalVisible, year: false})}
        />

        <PickerField
          label="Gearbox"
          value={carData.gearbox || 'Select Gearbox'}
          options={[
            {label: 'Select gearbox', value: 'Select Gearbox'},
            {label: 'Automatic', value: 'Automatic'},
            {label: 'Manual', value: 'Manual'},
          ]}
          modalVisible={modalVisible.gearbox}
          onPress={() => handleModalOpen('gearbox')}
          onValueChange={value =>
            updateCarData(
              'gearbox',
              value === 'Select Gearbox'
                ? null
                : (value as 'Automatic' | 'Manual'),
            )
          }
          onClose={() => handleModalClose('gearbox')}
        />

        <PickerField
          label="Color"
          value={carData.color || 'Select Color'}
          options={[
            {label: 'Select color', value: 'Select Color'},
            ...carColors.map(color => ({label: color, value: color})),
          ]}
          modalVisible={modalVisible.color}
          onPress={() => handleModalOpen('color')}
          onValueChange={value =>
            updateCarData(
              'color',
              value === 'Select Color' ? null : value?.toString() || null,
            )
          }
          onClose={() => handleModalClose('color')}
        />

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
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default AddDataScreen;
