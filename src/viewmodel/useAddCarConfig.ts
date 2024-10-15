import {carColors} from '../models/constants/carColors';
import {Car} from '../models/entities/Car';
import {
  CarAddFormConfigItem,
  CarDataFormTypes,
  ModalVisibility,
} from './types/carDataAddingTypes';

interface UseAddCarConfigParams {
  carData: CarDataFormTypes;
  filteredModels: Car['model'][];
  yearRange: Car['makeYear'][];
  supportedCarBrandsAndModels: {brand: Car['brand']; models: Car['model'][]}[];
  modalVisible: ModalVisibility;
  setModalVisible: (state: ModalVisibility) => void;
  updateCarData: <K extends keyof CarDataFormTypes>(
    key: K,
    value: CarDataFormTypes[K],
  ) => void;
}

export const useAddCarConfig = ({
  carData,
  filteredModels,
  yearRange,
  supportedCarBrandsAndModels,
}: UseAddCarConfigParams): CarAddFormConfigItem<keyof CarDataFormTypes>[] => {
  return [
    {
      label: 'Brand',
      value: carData.brand,
      modalKey: 'brand',
      options: supportedCarBrandsAndModels.map(item => ({
        label: item.brand,
        value: item.brand,
      })),
      disabled: false,
    },
    {
      label: 'Model',
      value: carData.model,
      modalKey: 'model',
      options: filteredModels.map(model => ({
        label: model,
        value: model,
      })),
      disabled: !carData.brand,
    },
    {
      label: 'Year',
      value: carData.makeYear ? carData.makeYear.toString() : null,
      modalKey: 'year',
      options: yearRange.map(year => ({
        label: year.toString(),
        value: year.toString(),
      })),
      disabled: false,
    },
    {
      label: 'Gearbox',
      value: carData.gearbox,
      modalKey: 'gearbox',
      options: [
        {label: 'Automatic', value: 'Automatic'},
        {label: 'Manual', value: 'Manual'},
      ],
      disabled: false,
    },
    {
      label: 'Color',
      value: carData.color,
      modalKey: 'color',
      options: carColors.map(color => ({
        label: color,
        value: color,
      })),
      disabled: false,
    },
  ];
};
