import {useState, useMemo, useEffect} from 'react';
import {Car} from '../../../models/entities/Car';
import {useYearOptions} from '../../../utils/hooks/useYearOptions';

export type CarFiltersReturn = ReturnType<typeof useCarFilters>;
export type Filters = CarFiltersReturn['filters'];
export type FilterFunctions = CarFiltersReturn['filterFunctions'];
export type FilterOptions = CarFiltersReturn['filterOptions'];

export const useCarFilters = (
  cars: Car[] | undefined,
  userId: string | undefined,
) => {
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [filterModel, setFilterModel] = useState<string>('');
  const [filterYearFrom, setFilterYearFrom] = useState<number | null>(null);
  const [filterYearTo, setFilterYearTo] = useState<number | null>(null);
  const [filterGearbox, setFilterGearbox] = useState<string>('');
  const [filterColor, setFilterColor] = useState<string>('');
  const [showOnlyUserCars, setShowOnlyUserCars] = useState<boolean>(false);

  const areFiltersActive = useMemo(() => {
    return (
      filterBrand !== '' ||
      filterModel !== '' ||
      filterYearFrom !== null ||
      filterYearTo !== null ||
      filterGearbox !== '' ||
      filterColor !== '' ||
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

  const resetFilters = () => {
    setFilterBrand('');
    setFilterModel('');
    setFilterYearFrom(null);
    setFilterYearTo(null);
    setFilterGearbox('');
    setFilterColor('');
    setShowOnlyUserCars(false);
  };

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

  const yearOptions = useYearOptions();

  useEffect(() => {
    if (filterModel && !modelOptions.includes(filterModel)) {
      setFilterModel('');
    }
  }, [filterBrand, modelOptions, filterModel]);

  const filteredCars = useMemo(() => {
    return (
      cars?.filter(car => {
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
