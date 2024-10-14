import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {useCars} from '../../viewmodel/useCars';
import CarItem from '../components/CarItem';
import FilterModal from '../components/FilterModal';
import FilterButton from '../components/FilterButton';
import {useCarFilterConfig} from '../../viewmodel/useCarFilterConfig';
import {useCarSortingConfig} from '../../viewmodel/useCarSortingConfig';
import {useAuth} from '../../context/UserContext';
import {QueryObserverResult} from '@tanstack/react-query';
import {Car} from '../../models/entities/Car';

const DataListScreen: React.FC = () => {
  const {userId} = useAuth();

  const {cars, isLoading, error, isCarOwner, dataHandling, serverFunctions} =
    useCars({userId});

  const {filterOptions, filters, filterFunctions, sorting, sortingFunctions} =
    dataHandling;

  const {refetch, deleteExistingCar} = serverFunctions;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useOnRefresh(refetch, setRefreshing);

  const filterConfigs = useCarFilterConfig({
    filterOptions,
    filters,
    filterFunctions,
  });

  const sortingConfigs = useCarSortingConfig(sorting, sortingFunctions);

  if (isLoading) {
    return <Text style={styles.centeredText}>Loading cars...</Text>;
  }
  if (error) {
    return (
      <Text style={styles.centeredText}>
        Error loading cars: {error.message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {filterConfigs.map((filter, index) => (
            <View key={index} style={styles.buttonContainer}>
              <FilterButton title={filter.title} onPress={filter.onPress} />
              {filter.modalOptions && (
                <FilterModal
                  visible={filter.modalOptions.modalVisible}
                  options={filter.modalOptions.options}
                  selectedValue={filter.modalOptions.selectedValue}
                  onValueChange={filter.modalOptions.onValueChange}
                  onRequestClose={filter.modalOptions.onRequestClose}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {sortingConfigs.map((sort, index) => (
            <View key={index} style={styles.buttonContainer}>
              {!sort.hidden && (
                <FilterButton title={sort.title} onPress={sort.onPress} />
              )}
              {sort.modalOptions && sort.modalOptions.modalVisible && (
                <FilterModal
                  visible={sort.modalOptions.modalVisible}
                  options={sort.modalOptions.options}
                  selectedValue={sort.modalOptions.selectedValue}
                  onValueChange={sort.modalOptions.onValueChange}
                  onRequestClose={sort.modalOptions.onRequestClose}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={cars}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CarItem
              car={item}
              onClickDelete={
                isCarOwner(item.id)
                  ? () => deleteExistingCar(item.id)
                  : undefined
              }
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.centeredText}>
              No cars available. Pull to refresh.
            </Text>
          }
        />
      </View>
    </View>
  );
};

const useOnRefresh = (
  refetch: () => Promise<QueryObserverResult<Car[], Error>>,
  setRefreshing: (value: boolean) => void,
) => {
  return async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };
};

const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  buttonContainer: {
    flexGrow: 0,
    flexShrink: 1,
    marginHorizontal: 8,
  },
  centeredText: {
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default DataListScreen;
