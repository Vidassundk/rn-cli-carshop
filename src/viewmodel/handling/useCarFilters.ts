import {useState, useMemo, useEffect} from 'react';
import {Car} from '../../models/entities/Car';

export type CarFiltersReturn = ReturnType<typeof useCarFilters>;

export type Filters = CarFiltersReturn['filters'];
export type FilterFunctions = CarFiltersReturn['filterFunctions'];
export type FilterOptions = CarFiltersReturn['filterOptions'];

export const useCarFilters = (
  cars: Car[] | undefined,
  userId: string | undefined,
) => {
  // Filter state
  const [filterBrand, setFilterBrand] = useState<string | null>(null);
  const [filterModel, setFilterModel] = useState<string | null>(null);
  const [filterYearFrom, setFilterYearFrom] = useState<number | null>(null);
  const [filterYearTo, setFilterYearTo] = useState<number | null>(null);
  const [filterGearbox, setFilterGearbox] = useState<string | null>(null);
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [showOnlyUserCars, setShowOnlyUserCars] = useState<boolean>(false);

  // Check if any filter is active
  const areFiltersActive = useMemo(() => {
    return (
      filterBrand !== null ||
      filterModel !== null ||
      filterYearFrom !== null ||
      filterYearTo !== null ||
      filterGearbox !== null ||
      filterColor !== null ||
      showOnlyUserCars !== false
    );
  }, [
    filterBrand,
    filterModel,
    filterYearFrom,
    filterYearTo,
    filterGearbox,
    filterColor,
    showOnlyUserCars,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setFilterBrand(null);
    setFilterModel(null);
    setFilterYearFrom(null);
    setFilterYearTo(null);
    setFilterGearbox(null);
    setFilterColor(null);
    setShowOnlyUserCars(false);
  };

  // Generate dynamic filter options from the unfiltered car data
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

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({length: 20}, (_, i) => currentYear - i);
  }, []);

  // Watch for brand changes and reset model if necessary
  useEffect(() => {
    if (filterModel && !modelOptions.includes(filterModel)) {
      setFilterModel(null); // Reset model if it's not available in the selected brand
    }
  }, [filterBrand, modelOptions, filterModel]);

  // Filter the cars based on the active filters
  const filteredCars = useMemo(() => {
    return (
      cars?.filter(car => {
        if (showOnlyUserCars && userId && car.userId !== userId) {return false;}
        if (filterBrand && car.brand !== filterBrand) {return false;}
        if (filterModel && car.model !== filterModel) {return false;}
        if (filterYearFrom && car.makeYear < filterYearFrom) {return false;}
        if (filterYearTo && car.makeYear > filterYearTo) {return false;}
        if (filterGearbox && car.gearbox !== filterGearbox) {return false;}
        if (filterColor && car.color !== filterColor) {return false;}
        return true;
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
  ]);

  return {
    filteredCars,
    filters: {
      filterBrand,
      filterModel,
      filterYearFrom,
      filterYearTo,
      filterGearbox,
      filterColor,
      showOnlyUserCars,
      areFiltersActive,
    },
    filterFunctions: {
      setFilterBrand,
      setFilterModel,
      setFilterYearFrom,
      setFilterYearTo,
      setFilterGearbox,
      setFilterColor,
      setShowOnlyUserCars,
      resetFilters,
    },
    filterOptions: {
      brandOptions,
      modelOptions,
      gearboxOptions,
      colorOptions,
      yearOptions,
    },
  };
};
