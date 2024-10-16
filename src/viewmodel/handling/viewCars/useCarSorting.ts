import {useState, useMemo} from 'react';
import {Car} from '../../../models/entities/Car';

export type SortField = keyof Car | null;
type SortDirection = 'asc' | 'desc';

export type CarSortingReturn = ReturnType<typeof useCarSorting>;
export type Sorts = CarSortingReturn['sorts'];
export type SortingFunctions = CarSortingReturn['sortingFunctions'];
export type SortedCars = CarSortingReturn['sortedCars'];

export const useCarSorting = (filteredCars: Car[]) => {
  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedCars = useMemo(() => {
    return [...filteredCars].sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      const directionMultiplier = sortDirection === 'asc' ? 1 : -1;

      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA === undefined || valueB === undefined) {
        return 0;
      }

      return valueA > valueB
        ? directionMultiplier
        : valueA < valueB
        ? -directionMultiplier
        : 0;
    });
  }, [filteredCars, sortBy, sortDirection]);

  return {
    sortedCars,
    sorts: {
      sortBy,
      sortDirection,
    },
    sortingFunctions: {
      setSortBy,
      setSortDirection,
    },
  };
};
