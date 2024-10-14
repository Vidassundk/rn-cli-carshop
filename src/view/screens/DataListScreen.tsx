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

const DataListScreen: React.FC = () => {
  const {
    cars,
    isLoading,
    error,
    deleteExistingCar,
    refetch,
    filterOptions,
    filters,
    sorting,
    isCarOwner,
  } = useCars();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const {
    brandOptions,
    modelOptions,
    yearOptions,
    gearboxOptions,
    colorOptions,
  } = filterOptions;

  const filterConfigs = useCarFilterConfig({
    brandOptions,
    modelOptions,
    yearOptions,
    gearboxOptions,
    colorOptions,
    filters,
  });

  const sortingConfigs = useCarSortingConfig(sorting);

  if (isLoading) {
    return <Text>Loading cars...</Text>;
  }
  if (error) {
    return <Text>Error loading cars: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterButtons}>
        <View style={styles.filterButtonWrapper}>
          {filterConfigs.map((filter, index) => (
            <React.Fragment key={index}>
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
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortButtons}>
        <View style={styles.filterButtonWrapper}>
          {sortingConfigs.map((sort, index) => (
            <React.Fragment key={index}>
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
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

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
          ListEmptyComponent={<Text>No cars available. Pull to refresh.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterButtons: {
    flexGrow: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
  sortButtons: {
    flexGrow: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
  filterButtonWrapper: {flexDirection: 'row', gap: 8},
});

export default DataListScreen;
