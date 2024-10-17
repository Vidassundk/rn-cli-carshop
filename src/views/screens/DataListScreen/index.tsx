import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import ThemedText from '@/views/components/ThemedText';
import {useCarDataHandling} from '@/viewmodels/handling/viewCars/useCarDataHandling';
import FiltersHeader from './components/FiltersHeader';
import SortingHeader from './components/SortingHeader';
import SearchBar from './components/SearchBar';
import CarItem from '../../components/CarItem';
import {useCarPostsService} from '@/viewmodels/data/useCarPostsService';
import {Car} from '@/models/entities/Car';
import {
  RouteProp,
  useRoute,
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {RootStackParamList, RootTabParamList} from '@/navigation/AppNavigator';
import {useTheme} from '@/viewmodels/context/ThemeContext';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import Loader from '@/views/components/Loader';
import {QueryObserverResult} from '@tanstack/react-query';

type DataListScreenRouteProp = RouteProp<RootTabParamList, 'DataList'>;

type DataListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'DataList'>,
  StackNavigationProp<RootStackParamList>
>;

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
  const navigation = useNavigation<DataListScreenNavigationProp>();

  const [refreshing, setRefreshing] = useState(false);
  const [visibleModal, setVisibleModal] = useState<string | null>(null);
  const {spacing, colors} = useTheme();

  useEffect(() => {
    if (route.params?.myCars) {
      filterFunctions.setShowOnlyUserCars(true);
      navigation.setParams({myCars: undefined});
    }
  }, [route.params?.myCars, filterFunctions, navigation]);

  const onRefresh = useOnRefresh(refetchCars, setRefreshing);
  const toggleModal = (modal: string) =>
    setVisibleModal(visibleModal === modal ? null : modal);

  return (
    <View style={styles.container}>
      {isCarsLoading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : (
        <FlatList
          testID="flat-list-cars"
          ListHeaderComponent={
            <View
              style={{
                gap: spacing.sm,
                marginVertical: spacing.md,
              }}>
              <View style={{marginBottom: spacing.md}}>
                <SearchBar setSearchQuery={setSearchQuery} />
              </View>
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
            </View>
          }
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
            <RefreshControl
              testID="refresh-control"
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          getItemLayout={(_, index) => ({
            length: 185,
            offset: 185 * index,
            index,
          })}
          ListEmptyComponent={
            carsError ? (
              <ThemedText
                style={[styles.centeredText, {marginTop: spacing.lg}]}>
                😥 Error loading cars: {carsError.message}
              </ThemedText>
            ) : (
              <ThemedText
                style={[styles.centeredText, {marginTop: spacing.lg}]}>
                😥 No cars available.
              </ThemedText>
            )
          }
        />
      )}
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
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  centeredText: {textAlign: 'center'},
});

export default DataListScreen;
