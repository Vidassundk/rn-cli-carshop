import {useState, useMemo, useEffect} from 'react';
import {Car} from '../models/entities/Car';
import {
  GearboxOption,
  SortField,
  SortDirection,
} from './types/carDataHandlingTypes';
import {User} from '../models/entities/User';

export const useCarDataHandling = (
  cars: Car[] | undefined,
  userId?: User['userId'],
) => {
  const [filterBrand, setFilterBrand] = useState<string | null>(null);
  const [filterModel, setFilterModel] = useState<string | null>(null);
  const [filterYearFrom, setFilterYearFrom] = useState<number | null>(null);
  const [filterYearTo, setFilterYearTo] = useState<number | null>(null);
  const [filterGearbox, setFilterGearbox] = useState<GearboxOption | null>(
    null,
  );
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [showOnlyUserCars, setShowOnlyUserCars] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Add search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  const brandOptions = useMemo(
    () => [...new Set(cars?.map(car => car.brand) ?? [])],
    [cars],
  );
  const modelOptions = useMemo(() => {
    const filtered = filterBrand
      ? cars?.filter(car => car.brand === filterBrand)
      : cars;
    return [...new Set(filtered?.map(car => car.model) ?? [])];
  }, [cars, filterBrand]);

  const gearboxOptions = useMemo(
    () => [...new Set(cars?.map(car => car.gearbox) ?? [])],
    [cars],
  );
  const colorOptions = useMemo(
    () => [...new Set(cars?.map(car => car.color) ?? [])],
    [cars],
  );
  const yearOptions = useMemo(
    () => [...new Set(cars?.map(car => car.makeYear) ?? [])].sort(),
    [cars],
  );

  useEffect(() => {
    if (filterModel && !modelOptions.includes(filterModel)) {
      setFilterModel(null);
    }
  }, [filterBrand, modelOptions, filterModel]);

  // Modify the filtering logic to split the search query into multiple terms
  const filteredCars = useMemo(() => {
    // Split the search query into individual terms (separated by spaces)
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);

    return (
      cars
        ?.filter(car => {
          if (showOnlyUserCars && userId && car.userId !== userId) {
            return false;
          }
          if (filterBrand && car.brand !== filterBrand) {
            return false;
          }
          if (filterModel && car.model !== filterModel) {
            return false;
          }
          if (filterYearFrom && car.makeYear < filterYearFrom) {
            return false;
          }
          if (filterYearTo && car.makeYear > filterYearTo) {
            return false;
          }
          if (filterGearbox && car.gearbox !== filterGearbox) {
            return false;
          }
          if (filterColor && car.color !== filterColor) {
            return false;
          }

          // If there are search terms, check if all terms match one of the car fields
          if (searchTerms.length > 0 && searchTerms[0] !== '') {
            const carData =
              `${car.brand} ${car.model} ${car.gearbox} ${car.makeYear} ${car.color}`.toLowerCase();

            // Ensure every search term matches part of the car's data
            return searchTerms.every(term => carData.includes(term));
          }

          return true;
        })
        ?.sort((a, b) => {
          if (!sortBy) {
            return 0;
          }
          const directionMultiplier = sortDirection === 'asc' ? 1 : -1;
          return a[sortBy] > b[sortBy]
            ? directionMultiplier
            : -directionMultiplier;
        }) ?? []
    );
  }, [
    cars,
    showOnlyUserCars,
    userId,
    filterBrand,
    filterModel,
    filterYearFrom,
    filterYearTo,
    filterGearbox,
    filterColor,
    sortBy,
    sortDirection,
    searchQuery, // Add searchQuery as a dependency
  ]);

  return {
    filteredCars,
    filterOptions: {
      brandOptions,
      modelOptions,
      yearOptions,
      gearboxOptions,
      colorOptions,
    },
    filters: {
      filterBrand,
      filterModel,
      filterYearFrom,
      filterYearTo,
      filterGearbox,
      filterColor,
      showOnlyUserCars,
    },
    filterFunctions: {
      setFilterBrand,
      setFilterModel,
      setFilterYearFrom,
      setFilterYearTo,
      setFilterGearbox,
      setFilterColor,
      setShowOnlyUserCars,
      setSearchQuery, // Expose search query setter
    },
    sorting: {
      sortBy,
      sortDirection,
    },
    sortingFunctions: {
      setSortBy,
      setSortDirection,
    },
  };
};
