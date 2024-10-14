import {useState, useMemo, useEffect} from 'react';
import {Car} from '../models/entities/Car';
import {
  GearboxOption,
  SortField,
  SortDirection,
} from './types/CarDataFiltering';
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

  const filteredCars = useMemo(() => {
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
