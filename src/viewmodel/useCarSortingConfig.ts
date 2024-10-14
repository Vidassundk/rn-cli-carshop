import {useState} from 'react';
import {
  FilterConfigItem,
  SortField,
  SortingProps,
  SortingFunctions,
} from './types/CarDataFiltering';

export const useCarSortingConfig = (
  sorting: SortingProps,
  sortingFunctions: SortingFunctions,
): FilterConfigItem<SortField>[] => {
  const [sortByModalVisible, setSortByModalVisible] = useState(false);

  const toggleSortDirection = () => {
    sortingFunctions.setSortDirection(
      sorting.sortDirection === 'asc' ? 'desc' : 'asc',
    );
  };

  const resetSorting = () => {
    sortingFunctions.setSortBy(null);
    sortingFunctions.setSortDirection('desc');
  };

  const isSortingDefault =
    sorting.sortBy === null && sorting.sortDirection === 'desc';

  const sortingConfigs: FilterConfigItem<SortField>[] = [
    {
      title: `Sort by: ${sorting.sortBy ?? 'None'}`,
      onPress: () => setSortByModalVisible(true),
      modalOptions: {
        modalVisible: sortByModalVisible,
        options: [
          {label: 'None', value: null},
          {label: 'Date Posted', value: 'datePosted'},
          {label: 'Make Year', value: 'makeYear'},
        ],
        selectedValue: sorting.sortBy,
        onValueChange: sortingFunctions.setSortBy,
        onRequestClose: () => setSortByModalVisible(false),
      },
    },
    {
      title: `Direction: ${
        sorting.sortDirection === 'asc' ? 'Ascending' : 'Descending'
      }`,
      onPress: toggleSortDirection,
      hidden: sorting.sortBy === null,
    },
    {
      title: 'Reset Sorting',
      onPress: resetSorting,
      hidden: isSortingDefault,
    },
  ];

  return sortingConfigs;
};
