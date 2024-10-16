import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import FilterButton from '../../../components/FilterButton';
import PickerModal from '../../../components/PickerModal';
import {
  SortField,
  SortingFunctions,
  Sorts,
} from '../../../../viewmodels/handling/viewCars/useCarSorting';

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

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <FilterButton
            title={`Sort by ${sortByLabel(sorts.sortBy)}`}
            onPress={() => toggleModal('sortBy')}
          />
          <PickerModal
            visible={visibleModal === 'sortBy'}
            options={[
              {label: 'Relevance', value: 'Relevance'},
              {label: 'Make Year', value: 'makeYear'},
              {label: 'Date Posted', value: 'datePosted'},
            ]}
            selectedValue={sorts.sortBy || null}
            onValueChange={value => {
              sortingFunctions.setSortBy(
                mapSortByValue(value?.toString() || 'Relevance'),
              );

              if (value === 'Relevance') {
                sortingFunctions.setSortDirection('desc');
              }
            }}
            onRequestClose={() => toggleModal('sortBy')}
          />
        </View>

        {sorts.sortBy && (
          <View style={styles.buttonContainer}>
            <FilterButton
              title={`${sorts.sortDirection === 'asc' ? 'Oldest' : 'Newest'}`}
              onPress={() =>
                sortingFunctions.setSortDirection(
                  sorts.sortDirection === 'asc' ? 'desc' : 'asc',
                )
              }
              disabled={!sorts.sortBy}
            />
          </View>
        )}
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

export default SortingHeader;
