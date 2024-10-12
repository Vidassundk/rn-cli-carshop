import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet, RefreshControl} from 'react-native';
import {useCars} from '../../viewmodel/useCars';
import CarItem from '../components/CarItem';

const DataListScreen: React.FC = () => {
  const {cars, isLoading, error, deleteExistingCar, refetch} = useCars();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return <Text>Loading cars...</Text>;
  }

  if (error) {
    return <Text>Error loading cars: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CarItem car={item} onDelete={() => deleteExistingCar(item.id)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No cars available. Pull to refresh.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default DataListScreen;
