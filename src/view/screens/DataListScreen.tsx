import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useCars} from '../../viewmodel/useCars';
import CarItem from '../components/CarItem';

const DataListScreen: React.FC = () => {
  const {cars, isLoading, error, deleteExistingCar} = useCars();

  if (isLoading) {
    return <Text>Loading cars...</Text>;
  }

  if (error) {
    return <Text>Error loading cars: {error.message}</Text>;
  }

  const handleDelete = (id: number) => {
    deleteExistingCar(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CarItem car={item} onDelete={handleDelete} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default DataListScreen;
