import {useState} from 'react';
import {
  CarFilterFunctions,
  CarFilterOptions,
  CarFilters,
  FilterConfigItem,
} from './types/CarDataFiltering';

export const useCarFilterConfig = ({
  filterOptions,
  filters,
  filterFunctions,
}: {
  filterOptions: CarFilterOptions;
  filters: CarFilters;
  filterFunctions: CarFilterFunctions;
}): FilterConfigItem[] => {
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [gearboxModalVisible, setGearboxModalVisible] = useState(false);
  const [yearFromModalVisible, setYearFromModalVisible] = useState(false);
  const [yearToModalVisible, setYearToModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const resetFilters = () => {
    filterFunctions.setFilterBrand(null);
    filterFunctions.setFilterModel(null);
    filterFunctions.setFilterYearFrom(null);
    filterFunctions.setFilterYearTo(null);
    filterFunctions.setFilterGearbox(null);
    filterFunctions.setFilterColor(null);
  };

  const isResetDisabled =
    !filters.filterBrand &&
    !filters.filterModel &&
    !filters.filterYearFrom &&
    !filters.filterYearTo &&
    !filters.filterGearbox &&
    !filters.filterColor;

  return [
    {
      title: 'Reset Filters',
      onPress: resetFilters,
      disabled: isResetDisabled,
    },
    {
      title: `Brand: ${filters.filterBrand ?? 'All'}`,
      onPress: () => setBrandModalVisible(true),
      modalOptions: {
        modalVisible: brandModalVisible,
        options: [
          {label: 'All Brands', value: null},
          ...filterOptions.brandOptions.map(brand => ({
            label: brand,
            value: brand,
          })),
        ],
        selectedValue: filters.filterBrand,
        onValueChange: filterFunctions.setFilterBrand,
        onRequestClose: () => setBrandModalVisible(false),
      },
    },
    {
      title: `Model: ${filters.filterModel ?? 'All'}`,
      onPress: () => setModelModalVisible(true),
      modalOptions: {
        modalVisible: modelModalVisible,
        options: [
          {label: 'All Models', value: null},
          ...filterOptions.modelOptions.map(model => ({
            label: model,
            value: model,
          })),
        ],
        selectedValue: filters.filterModel,
        onValueChange: filterFunctions.setFilterModel,
        onRequestClose: () => setModelModalVisible(false),
      },
    },
    {
      title: `Gearbox: ${filters.filterGearbox ?? 'All'}`,
      onPress: () => setGearboxModalVisible(true),
      modalOptions: {
        modalVisible: gearboxModalVisible,
        options: [
          {label: 'All Gearboxes', value: null},
          ...filterOptions.gearboxOptions.map(gearbox => ({
            label: gearbox,
            value: gearbox,
          })),
        ],
        selectedValue: filters.filterGearbox,
        onValueChange: filterFunctions.setFilterGearbox as (
          value: string | null,
        ) => void,
        onRequestClose: () => setGearboxModalVisible(false),
      },
    },
    {
      title: `Year From: ${filters.filterYearFrom?.toString() ?? 'All'}`,
      onPress: () => setYearFromModalVisible(true),
      modalOptions: {
        modalVisible: yearFromModalVisible,
        options: [
          {label: 'All Years', value: null},
          ...filterOptions.yearOptions.map(year => ({
            label: year.toString(),
            value: year.toString(),
          })),
        ],
        selectedValue: filters.filterYearFrom?.toString() ?? null,
        onValueChange: value =>
          filterFunctions.setFilterYearFrom(Number(value)),
        onRequestClose: () => setYearFromModalVisible(false),
      },
    },
    {
      title: `Year To: ${filters.filterYearTo?.toString() ?? 'All'}`,
      onPress: () => setYearToModalVisible(true),
      modalOptions: {
        modalVisible: yearToModalVisible,
        options: [
          {label: 'All Years', value: null},
          ...filterOptions.yearOptions.map(year => ({
            label: year.toString(),
            value: year.toString(),
          })),
        ],
        selectedValue: filters.filterYearTo?.toString() ?? null,
        onValueChange: value => filterFunctions.setFilterYearTo(Number(value)),
        onRequestClose: () => setYearToModalVisible(false),
      },
    },
    {
      title: `Color: ${filters.filterColor ?? 'All'}`,
      onPress: () => setColorModalVisible(true),
      modalOptions: {
        modalVisible: colorModalVisible,
        options: [
          {label: 'All Colors', value: null},
          ...filterOptions.colorOptions.map(color => ({
            label: color,
            value: color,
          })),
        ],
        selectedValue: filters.filterColor,
        onValueChange: filterFunctions.setFilterColor,
        onRequestClose: () => setColorModalVisible(false),
      },
    },
  ];
};
