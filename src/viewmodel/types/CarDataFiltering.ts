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
  setSortBy: (value: SortField) => void;
  sortDirection: SortDirection;
  setSortDirection: (value: SortDirection) => void;
}

export interface CarFilters {
  filterBrand: string | null;
  setFilterBrand: (value: string | null) => void;
  filterModel: string | null;
  setFilterModel: (value: string | null) => void;
  filterYearFrom: number | null;
  setFilterYearFrom: (value: number | null) => void;
  filterYearTo: number | null;
  setFilterYearTo: (value: number | null) => void;
  filterGearbox: GearboxOption | null;
  setFilterGearbox: (value: GearboxOption | null) => void;
  filterColor: string | null;
  setFilterColor: (value: string | null) => void;
}
