import {renderHook} from '@testing-library/react-hooks';
import {useCarImageUpdater} from '../useCarImageUpdater'; // Adjust the path as needed
import {CarForm} from '../useAddCarForm';
import {SupportedCar} from '../../../../models/entities/SupportedCar';

describe('useCarImageUpdater', () => {
  const mockSetCarData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the image based on brand when model is not selected', () => {
    const carData: CarForm = {
      brand: 'Toyota',
      model: null,
      makeYear: null,
      gearbox: null,
      color: null,
      photoUrl: null,
    };

    const supportedCarBrandsAndModels: SupportedCar[] = [
      {
        brand: 'Toyota',
        brandImage: 'https://example.com/toyota.png',
        models: [],
      },
    ];

    renderHook(() =>
      useCarImageUpdater(carData, mockSetCarData, supportedCarBrandsAndModels),
    );

    expect(mockSetCarData).toHaveBeenCalled();
    const updaterFunction = mockSetCarData.mock.calls[0][0];

    const newState = updaterFunction(carData);
    expect(newState).toEqual({
      ...carData,
      photoUrl: 'https://example.com/toyota.png',
    });
  });

  it('should update the image based on model when both brand and model are selected', () => {
    const carData: CarForm = {
      brand: 'Toyota',
      model: 'Corolla',
      makeYear: null,
      gearbox: null,
      color: null,
      photoUrl: null,
    };

    const supportedCarBrandsAndModels: SupportedCar[] = [
      {
        brand: 'Toyota',
        brandImage: 'https://example.com/toyota.png',
        models: [
          {
            name: 'Corolla',
            image: 'https://example.com/corolla.png',
          },
        ],
      },
    ];

    renderHook(() =>
      useCarImageUpdater(carData, mockSetCarData, supportedCarBrandsAndModels),
    );

    expect(mockSetCarData).toHaveBeenCalled();
    const updaterFunction = mockSetCarData.mock.calls[0][0];

    const newState = updaterFunction(carData);
    expect(newState).toEqual({
      ...carData,
      photoUrl: 'https://example.com/corolla.png',
    });
  });
});
