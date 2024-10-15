import {Car} from '../../models/entities/Car';
import {GearboxOption} from './carDataHandlingTypes';

export interface CarDataFormTypes {
  brand: Car['brand'] | null;
  model: Car['model'] | null;
  makeYear: Car['makeYear'] | null;
  gearbox: GearboxOption | null;
  color: Car['color'] | null;
}

export interface ModalVisibility {
  brand: boolean;
  model: boolean;
  gearbox: boolean;
  color: boolean;
  year: boolean;
}

export interface CarAddFormConfigItem<K extends keyof CarDataFormTypes> {
  label: string;
  value: CarDataFormTypes[K];
  modalKey: keyof ModalVisibility;
  options: {label: string; value: CarDataFormTypes[K]}[];
  disabled: boolean;
}
