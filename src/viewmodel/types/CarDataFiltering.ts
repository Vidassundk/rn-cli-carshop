export type SortField = 'datePosted' | 'makeYear' | null;
export type SortDirection = 'asc' | 'desc';

export interface ModalOptions<T> {
  modalVisible: boolean;
  options: Array<{label: string; value: T | null}>;
  selectedValue: T | null;
  onValueChange: (value: T | null) => void;
  onRequestClose: () => void;
}

export type GearboxOption = 'Automatic' | 'Manual';

export interface FilterConfigItem<T = string | null> {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  hidden?: boolean;
  modalOptions?: ModalOptions<T>;
}

export interface SortingProps {
  sortBy: SortField;
  sortDirection: SortDirection;
}

export interface SortingFunctions {
  setSortBy: (value: SortField) => void;
  setSortDirection: (value: SortDirection) => void;
}

export interface CarFilters {
  filterBrand: string | null;
  filterModel: string | null;
  filterYearFrom: number | null;
  filterYearTo: number | null;
  filterGearbox: GearboxOption | null;
  filterColor: string | null;
  showOnlyUserCars: boolean;
}

export interface CarFilterFunctions {
  setFilterBrand: (value: string | null) => void;
  setFilterModel: (value: string | null) => void;
  setFilterYearFrom: (value: number | null) => void;
  setFilterYearTo: (value: number | null) => void;
  setFilterGearbox: (value: GearboxOption | null) => void;
  setFilterColor: (value: string | null) => void;
  setShowOnlyUserCars: (value: boolean) => void;
}

export interface CarFilterOptions {
  brandOptions: string[];
  modelOptions: string[];
  yearOptions: number[];
  gearboxOptions: GearboxOption[];
  colorOptions: string[];
}
