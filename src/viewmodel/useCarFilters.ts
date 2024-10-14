import {useState, useMemo, useEffect} from 'react';
import {Car} from '../models/entities/Car';
import {
  GearboxOption,
  SortField,
  SortDirection,
} from './types/CarDataFiltering';
import {User} from '../models/entities/User';

export const useCarFilters = (
  cars: Car[] | undefined,
  sortBy: SortField,
  sortDirection: SortDirection,
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

  const brandOptions = useMemo(() => {
    const brands = cars?.map(car => car.brand) ?? [];
    return Array.from(new Set(brands));
  }, [cars]);

  const modelOptions = useMemo(() => {
    const filteredCars = filterBrand
      ? cars?.filter(car => car.brand === filterBrand) ?? []
      : cars ?? [];
    const models = filteredCars.map(car => car.model);
    return Array.from(new Set(models));
  }, [cars, filterBrand]);

  useEffect(() => {
    if (filterModel && !modelOptions.includes(filterModel)) {
      setFilterModel(null);
    }
  }, [filterBrand, modelOptions, filterModel]);

  const gearboxOptions = useMemo(() => {
    const gearboxes = cars?.map(car => car.gearbox) ?? [];
    return Array.from(new Set(gearboxes));
  }, [cars]);

  const colorOptions = useMemo(() => {
    const colors = cars?.map(car => car.color) ?? [];
    return Array.from(new Set(colors));
  }, [cars]);

  const yearOptions = useMemo(() => {
    const years = cars?.map(car => car.makeYear) ?? [];
    return Array.from(new Set(years)).sort();
  }, [cars]);

  const filteredCars = useMemo(() => {
    const filtered =
      cars?.filter(car => {
        if (showOnlyUserCars && userId && car.userId !== userId) {
          return false;
        }
        if (filterBrand !== null && car.brand !== filterBrand) {
          return false;
        }
        if (filterModel !== null && car.model !== filterModel) {
          return false;
        }
        if (filterYearFrom !== null && car.makeYear < filterYearFrom) {
          return false;
        }
        if (filterYearTo !== null && car.makeYear > filterYearTo) {
          return false;
        }
        if (filterGearbox !== null && car.gearbox !== filterGearbox) {
          return false;
        }
        if (filterColor !== null && car.color !== filterColor) {
          return false;
        }
        return true;
      }) ?? [];

    return filtered.sort((a, b) => {
      if (!sortBy) {
        return 0;
      }
      const directionMultiplier = sortDirection === 'asc' ? 1 : -1;
      return a[sortBy] > b[sortBy] ? directionMultiplier : -directionMultiplier;
    });
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
    brandOptions,
    modelOptions,
    yearOptions,
    gearboxOptions,
    colorOptions,
    filterBrand,
    setFilterBrand,
    filterModel,
    setFilterModel,
    filterYearFrom,
    setFilterYearFrom,
    filterYearTo,
    setFilterYearTo,
    filterGearbox,
    setFilterGearbox,
    filterColor,
    setFilterColor,
    showOnlyUserCars,
    setShowOnlyUserCars,
  };
};
