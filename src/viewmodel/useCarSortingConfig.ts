import {useState} from 'react';
import {
  FilterConfigItem,
  SortField,
  SortingProps,
} from '../models/CarDataFiltering';

export const useCarSortingConfig = (
  sorting: SortingProps,
): FilterConfigItem<SortField>[] => {
  const [sortByModalVisible, setSortByModalVisible] = useState(false);

  const toggleSortDirection = () => {
    sorting.setSortDirection(sorting.sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const resetSorting = () => {
    sorting.setSortBy(null);
    sorting.setSortDirection('desc');
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
        onValueChange: sorting.setSortBy,
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
