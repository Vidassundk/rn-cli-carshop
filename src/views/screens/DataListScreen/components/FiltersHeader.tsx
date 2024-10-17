import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import FilterButton from '@/views/components/FilterButton';
import PickerModal from '@/views/components/PickerModal';
import {
  FilterFunctions,
  FilterOptions,
  Filters,
} from '@/viewmodels/handling/viewCars/useCarFilters';
import ThemedText from '@/views/components/ThemedText';
import {useTheme} from '@/viewmodels/context/ThemeContext';

const safelyConvertValueToString = (
  value: string | number | null | undefined,
): string => {
  return value !== null && value !== undefined ? value.toString() : '';
};

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
  const {spacing, colors} = useTheme();

  const renderFilterButton = (
    title: string,
    currentValue: string | number | null,
    options: {label: string; value: string | number}[] = [],
    modalKey: string,
    onValueChange: (value: string) => void,
  ) => (
    <>
      <FilterButton
        title={
          currentValue
            ? safelyConvertValueToString(currentValue)
            : `All ${title}`
        }
        style={{
          backgroundColor: currentValue ? colors.notification : colors.card,
        }}
        onPress={() => toggleModal(modalKey)}
      />
      <PickerModal
        visible={visibleModal === modalKey}
        options={[{label: `All ${title}`, value: ''}, ...options]}
        selectedValue={safelyConvertValueToString(currentValue)}
        onValueChange={value =>
          onValueChange(safelyConvertValueToString(value))
        }
        onRequestClose={() => toggleModal(modalKey)}
      />
    </>
  );

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: spacing.md}}>
        <View style={[styles.buttonRow, {gap: spacing.md}]}>
          <ThemedText variant="label">Filter:</ThemedText>
          <FilterButton
            title={
              !filters.areFiltersActive ? 'No Filters Set' : 'Reset Filters'
            }
            onPress={filterFunctions.resetFilters}
            disabled={!filters.areFiltersActive}
          />
          <FilterButton
            title={filters.showOnlyUserCars ? 'My Cars Only' : 'All Cars'}
            style={{
              backgroundColor: !filters.showOnlyUserCars
                ? colors.card
                : colors.notification,
            }}
            onPress={() =>
              filterFunctions.setShowOnlyUserCars(!filters.showOnlyUserCars)
            }
          />
          {renderFilterButton(
            'Brand',
            filters.filterBrand,
            filterOptions.brandOptions?.map(option => ({
              label: option,
              value: option,
            })),
            'brand',
            filterFunctions.setFilterBrand,
          )}
          {renderFilterButton(
            'Model',
            filters.filterModel,
            filterOptions.modelOptions?.map(option => ({
              label: option,
              value: option,
            })),
            'model',
            filterFunctions.setFilterModel,
          )}
          {renderFilterButton(
            'From Year',
            filters.filterYearFrom,
            filterOptions.yearOptions?.map(option => ({
              label: option.toString(),
              value: option.toString(),
            })),
            'yearFrom',
            value =>
              filterFunctions.setFilterYearFrom(
                value ? parseInt(value, 10) : null,
              ),
          )}
          {renderFilterButton(
            'To Year',
            filters.filterYearTo,
            filterOptions.yearOptions?.map(option => ({
              label: option.toString(),
              value: option.toString(),
            })),
            'yearTo',
            value =>
              filterFunctions.setFilterYearTo(
                value ? parseInt(value, 10) : null,
              ),
          )}
          {renderFilterButton(
            'Gearbox',
            filters.filterGearbox,
            filterOptions.gearboxOptions?.map(option => ({
              label: option,
              value: option,
            })),
            'gearbox',
            filterFunctions.setFilterGearbox,
          )}
          {renderFilterButton(
            'Color',
            filters.filterColor,
            filterOptions.colorOptions?.map(option => ({
              label: option,
              value: option,
            })),
            'color',
            filterFunctions.setFilterColor,
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FiltersHeader;
