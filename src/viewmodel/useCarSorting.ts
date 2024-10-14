import {useState} from 'react';
import {SortDirection, SortField} from '../models/CarDataFiltering';

export const useCarSorting = () => {
  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  return {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
  };
};
