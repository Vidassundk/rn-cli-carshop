import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, RefreshControl} from 'react-native';
import {useCarDataHandling} from '../../../viewmodels/handling/viewCars/useCarDataHandling';
import FiltersHeader from './components/FiltersHeader';
import SortingHeader from './components/SortingHeader';
import SearchBar from './components/SearchBar';
import CarItem from '../../components/CarItem';
import {useCarPostsService} from '../../../viewmodels/data/useCarPostsService';
import {QueryObserverResult} from '@tanstack/react-query';
import {Car} from '../../../models/entities/Car';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootTabParamList} from '@/navigation/AppNavigator';

type DataListScreenRouteProp = RouteProp<RootTabParamList, 'DataList'>;

const DataListScreen: React.FC = () => {
  const {
    cars,
    filters: {filterOptions, filterFunctions, filters},
    sorting: {sortingFunctions, sorts},
    search: {setSearchQuery},
    status: {refetchCars, isCarsLoading, carsError},
  } = useCarDataHandling();

  const {mutations} = useCarPostsService();
  const route = useRoute<DataListScreenRouteProp>();

  const [refreshing, setRefreshing] = useState(false);
  const [visibleModal, setVisibleModal] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.myCars) {
      filterFunctions.setShowOnlyUserCars(true);
    }
  }, [route.params?.myCars, filterFunctions]);

  const onRefresh = useOnRefresh(refetchCars, setRefreshing);
  const toggleModal = (modal: string) =>
    setVisibleModal(visibleModal === modal ? null : modal);

  if (isCarsLoading) {
    return <Text style={styles.centeredText}>Loading cars...</Text>;
  }

  if (carsError) {
    return (
      <Text style={styles.centeredText}>
        Error loading cars: {carsError.message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <FiltersHeader
        filters={filters}
        filterFunctions={filterFunctions}
        filterOptions={filterOptions}
        toggleModal={toggleModal}
        visibleModal={visibleModal}
      />
      <SortingHeader
        sorts={sorts}
        sortingFunctions={sortingFunctions}
        toggleModal={toggleModal}
        visibleModal={visibleModal}
      />
      <SearchBar setSearchQuery={setSearchQuery} />

      <View style={styles.listContainer}>
        <FlatList
          data={cars}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CarItem
              car={item}
              onClickDelete={
                item.isUserCar
                  ? () => mutations.deleteExistingCar(item.id)
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
  listContainer: {flex: 1, paddingHorizontal: 16},
  centeredText: {textAlign: 'center', marginVertical: 20},
});

export default DataListScreen;
