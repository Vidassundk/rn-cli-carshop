import {useState, useMemo} from 'react';
import {Car} from '../../../models/entities/Car';

export const useCarSearch = (filteredCars: Car[]) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchedCars = useMemo(() => {
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);

    return filteredCars.filter(car => {
      const carData =
        `${car.brand} ${car.model} ${car.gearbox} ${car.makeYear} ${car.color}`.toLowerCase();

      return searchTerms.every(term => carData.includes(term));
    });
  }, [filteredCars, searchQuery]);

  return {
    searchedCars,
    setSearchQuery,
  };
};
