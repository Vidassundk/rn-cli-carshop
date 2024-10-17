import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import FilterButton from '@/views/components/FilterButton';
import PickerModal from '@/views/components/PickerModal';
import {
  SortField,
  SortingFunctions,
  Sorts,
} from '@/viewmodels/handling/viewCars/useCarSorting';
import ThemedText from '@/views/components/ThemedText';
import {useTheme} from '@/viewmodels/context/ThemeContext';

interface SortingHeaderProps {
  sorts: Sorts;
  sortingFunctions: SortingFunctions;
  toggleModal: (modal: string) => void;
  visibleModal: string | null;
}

const SortingHeader: React.FC<SortingHeaderProps> = ({
  sorts,
  sortingFunctions,
  toggleModal,
  visibleModal,
}) => {
  const {spacing} = useTheme();

  const sortByLabel = (sortBy: string | null) => {
    switch (sortBy) {
      case 'makeYear':
        return 'Make Year';
      case 'datePosted':
        return 'Date Posted';
      default:
        return 'Relevance';
    }
  };

  const mapSortByValue = (value: string): SortField => {
    switch (value) {
      case 'makeYear':
        return 'makeYear';
      case 'datePosted':
        return 'datePosted';
      case 'Relevance':
      default:
        return null;
    }
  };

  const renderSortButton = (
    title: string,
    modalKey: string,
    options: {label: string; value: string}[],
    currentValue: string | null,
    onValueChange: (value: string) => void,
  ) => (
    <>
      <FilterButton
        title={`Sort by ${title}`}
        onPress={() => toggleModal(modalKey)}
      />
      <PickerModal
        visible={visibleModal === modalKey}
        options={options}
        selectedValue={currentValue || null}
        onValueChange={value => onValueChange(value?.toString() || 'Relevance')}
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
          <ThemedText variant="label">Sort:</ThemedText>
          {renderSortButton(
            sortByLabel(sorts.sortBy),
            'sortBy',
            [
              {label: 'Relevance', value: 'Relevance'},
              {label: 'Make Year', value: 'makeYear'},
              {label: 'Date Posted', value: 'datePosted'},
            ],
            sorts.sortBy,
            value => {
              sortingFunctions.setSortBy(mapSortByValue(value));
              if (value === 'Relevance') {
                sortingFunctions.setSortDirection('desc');
              }
            },
          )}
          {sorts.sortBy && (
            <FilterButton
              title={sorts.sortDirection === 'asc' ? 'Oldest' : 'Newest'}
              onPress={() =>
                sortingFunctions.setSortDirection(
                  sorts.sortDirection === 'asc' ? 'desc' : 'asc',
                )
              }
              disabled={!sorts.sortBy}
            />
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

export default SortingHeader;
