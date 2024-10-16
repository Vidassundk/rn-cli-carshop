import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import FilterButton from '../../../components/FilterButton';
import PickerModal from '../../../components/PickerModal';
import {
  FilterFunctions,
  FilterOptions,
  Filters,
} from '../../../../viewmodel/handling/viewCars/useCarFilters';

interface FiltersHeaderProps {
  filters: Filters;
  filterFunctions: FilterFunctions;
  filterOptions: FilterOptions;
  toggleModal: (modal: string) => void;
  visibleModal: string | null;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({
  filters,
  filterFunctions,
  filterOptions,
  toggleModal,
  visibleModal,
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <FilterButton
            title={!filters.areFiltersActive ? 'Set Filters:' : 'Reset Filters'}
            onPress={filterFunctions.resetFilters}
            disabled={!filters.areFiltersActive}
          />
        </View>
        <View style={styles.buttonContainer}>
          <FilterButton
            title={filters.showOnlyUserCars ? 'My Cars' : 'All Cars'}
            onPress={() =>
              filterFunctions.setShowOnlyUserCars(!filters.showOnlyUserCars)
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <FilterButton
            title={filters.filterBrand || 'All Brands'}
            onPress={() => toggleModal('brand')}
          />
          <PickerModal
            visible={visibleModal === 'brand'}
            options={[
              {label: 'All Brands', value: ''},
              ...filterOptions.brandOptions.map(option => ({
                label: option,
                value: option,
              })),
            ]}
            selectedValue={filters.filterBrand || ''}
            onValueChange={value => {
              filterFunctions.setFilterBrand(value?.toString() || '');
            }}
            onRequestClose={() => toggleModal('brand')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <FilterButton
            title={filters.filterModel || 'All Models'}
            onPress={() => toggleModal('model')}
          />
          <PickerModal
            visible={visibleModal === 'model'}
            options={[
              {label: 'All Models', value: ''},
              ...filterOptions.modelOptions.map(option => ({
                label: option,
                value: option,
              })),
            ]}
            selectedValue={filters.filterModel || ''}
            onValueChange={value => {
              filterFunctions.setFilterModel(value?.toString() || '');
            }}
            onRequestClose={() => toggleModal('model')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <FilterButton
            title={
              filters.filterYearFrom
                ? `From ${filters.filterYearFrom.toString()}`
                : 'From any year'
            }
            onPress={() => toggleModal('yearFrom')}
          />
          <PickerModal
            visible={visibleModal === 'yearFrom'}
            options={[
              {label: 'All Years', value: ''},
              ...filterOptions.yearOptions.map(option => ({
                label: option.toString(),
                value: option.toString(),
              })),
            ]}
            selectedValue={filters.filterYearFrom?.toString() || ''}
            onValueChange={value => {
              filterFunctions.setFilterYearFrom(
                value === ''
                  ? null
                  : parseInt(value?.toString() || '', 10) || null,
              );
            }}
            onRequestClose={() => toggleModal('yearFrom')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <FilterButton
            title={
              filters.filterYearTo
                ? `To ${filters.filterYearTo?.toString()}`
                : 'To any year'
            }
            onPress={() => toggleModal('yearTo')}
          />
          <PickerModal
            visible={visibleModal === 'yearTo'}
            options={[
              {label: 'All Years', value: ''},
              ...filterOptions.yearOptions.map(option => ({
                label: option.toString(),
                value: option.toString(),
              })),
            ]}
            selectedValue={filters.filterYearTo?.toString() || ''}
            onValueChange={value => {
              filterFunctions.setFilterYearTo(
                value === ''
                  ? null
                  : parseInt(value?.toString() || '', 10) || null,
              );
            }}
            onRequestClose={() => toggleModal('yearTo')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <FilterButton
            title={filters.filterGearbox || 'All Gearboxes'}
            onPress={() => toggleModal('gearbox')}
          />
          <PickerModal
            visible={visibleModal === 'gearbox'}
            options={[
              {label: 'All Gearboxes', value: ''},
              ...filterOptions.gearboxOptions.map(option => ({
                label: option,
                value: option,
              })),
            ]}
            selectedValue={filters.filterGearbox || ''}
            onValueChange={value => {
              filterFunctions.setFilterGearbox(value?.toString() || '');
            }}
            onRequestClose={() => toggleModal('gearbox')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexGrow: 0,
    flexShrink: 1,
    marginHorizontal: 8,
  },
  scrollView: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },
});

export default FiltersHeader;
