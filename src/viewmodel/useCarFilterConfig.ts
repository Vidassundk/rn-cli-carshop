import {useState} from 'react';
import {
  CarFilters,
  FilterConfigItem,
  GearboxOption,
} from './types/CarDataFiltering';

export const useCarFilterConfig = ({
  brandOptions,
  modelOptions,
  yearOptions,
  gearboxOptions,
  colorOptions,
  filters,
}: {
  brandOptions: string[];
  modelOptions: string[];
  yearOptions: number[];
  gearboxOptions: GearboxOption[];
  colorOptions: string[];
  filters: CarFilters;
}): FilterConfigItem[] => {
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [gearboxModalVisible, setGearboxModalVisible] = useState(false);
  const [yearFromModalVisible, setYearFromModalVisible] = useState(false);
  const [yearToModalVisible, setYearToModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const resetFilters = () => {
    filters.setFilterBrand(null);
    filters.setFilterModel(null);
    filters.setFilterYearFrom(null);
    filters.setFilterYearTo(null);
    filters.setFilterGearbox(null);
    filters.setFilterColor(null);
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
          ...brandOptions.map(brand => ({label: brand, value: brand})),
        ],
        selectedValue: filters.filterBrand,
        onValueChange: filters.setFilterBrand,
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
          ...modelOptions.map(model => ({label: model, value: model})),
        ],
        selectedValue: filters.filterModel,
        onValueChange: filters.setFilterModel,
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
          ...gearboxOptions.map(gearbox => ({label: gearbox, value: gearbox})),
        ],
        selectedValue: filters.filterGearbox,
        onValueChange: filters.setFilterGearbox as (
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
          ...yearOptions.map(year => ({
            label: year.toString(),
            value: year.toString(),
          })),
        ],
        selectedValue: filters.filterYearFrom?.toString() ?? null,
        onValueChange: value => filters.setFilterYearFrom(Number(value)),
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
          ...yearOptions.map(year => ({
            label: year.toString(),
            value: year.toString(),
          })),
        ],
        selectedValue: filters.filterYearTo?.toString() ?? null,
        onValueChange: value => filters.setFilterYearTo(Number(value)),
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
          ...colorOptions.map(color => ({label: color, value: color})),
        ],
        selectedValue: filters.filterColor,
        onValueChange: filters.setFilterColor,
        onRequestClose: () => setColorModalVisible(false),
      },
    },
  ];
};
