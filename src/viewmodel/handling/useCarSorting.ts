import {useState, useMemo} from 'react';
import {Car} from '../../models/entities/Car';

// Define possible fields to sort by
export type SortField = keyof Car | null;

// Define sorting direction type
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
      if (!sortBy) {return 0;}
      const directionMultiplier = sortDirection === 'asc' ? 1 : -1;

      // Compare based on the selected field, assuming all comparable fields in Car are strings or numbers
      return a[sortBy] > b[sortBy] ? directionMultiplier : -directionMultiplier;
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
