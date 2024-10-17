import React, {act} from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {useCarDataHandling} from '@/viewmodels/handling/viewCars/useCarDataHandling';
import {useCarPostsService} from '@/viewmodels/data/useCarPostsService';
import {useNavigation, useRoute} from '@react-navigation/native';
import DataListScreen from '..';

jest.mock('@/viewmodels/handling/viewCars/useCarDataHandling');
jest.mock('@/viewmodels/data/useCarPostsService');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('DataListScreen', () => {
  const mockCars = [
    {id: 1, isUserCar: true, brand: 'Toyota', model: 'Corolla'},
    {id: 2, isUserCar: false, brand: 'Honda', model: 'Civic'},
  ];

  const mockMutations = {
    deleteExistingCar: jest.fn(),
  };

  let mockUseCarDataHandling: any;

  beforeEach(() => {
    mockUseCarDataHandling = {
      cars: [...mockCars],
      filters: {
        filterOptions: {
          brandOptions: ['Toyota', 'Honda'],
          modelOptions: ['Corolla', 'Civic'],
          yearOptions: [2000, 2021],
          gearboxOptions: ['Manual', 'Automatic'],
        },
        filterFunctions: {
          setShowOnlyUserCars: jest.fn(),
        },
        filters: {},
      },
      sorting: {
        sortingFunctions: {},
        sorts: {},
      },
      search: {
        setSearchQuery: jest.fn(),
      },
      status: {
        refetchCars: jest.fn(),
        isCarsLoading: false,
        carsError: null,
      },
    };

    (useCarDataHandling as jest.Mock).mockReturnValue(mockUseCarDataHandling);
    (useCarPostsService as jest.Mock).mockReturnValue({
      mutations: mockMutations,
    });
    (useRoute as jest.Mock).mockReturnValue({params: {}});
    (useNavigation as jest.Mock).mockReturnValue({
      setParams: jest.fn(),
    });
  });

  it('renders correctly', async () => {
    const {getByPlaceholderText, getByText} = render(<DataListScreen />);

    expect(
      getByPlaceholderText('Search by brand, model, year, gearbox, color'),
    ).toBeTruthy();
    expect(getByText(/Toyota/i)).toBeTruthy();
    expect(getByText(/Honda/i)).toBeTruthy();
  });

  it('handles delete action', async () => {
    const {getByText} = render(<DataListScreen />);

    const deleteButton = getByText('Delete');

    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(mockMutations.deleteExistingCar).toHaveBeenCalledWith(1);
    });
  });

  it('handles refresh', async () => {
    const {getByTestId} = render(<DataListScreen />);
    const flatList = getByTestId('flat-list-cars');

    const refreshControl = flatList.props.refreshControl;

    const onRefresh = refreshControl.props.onRefresh;

    act(() => {
      onRefresh();
    });

    await waitFor(() => {
      expect(mockUseCarDataHandling.status.refetchCars).toHaveBeenCalled();
    });
  });

  it('displays error message on fetch error', async () => {
    mockUseCarDataHandling.cars = [];
    mockUseCarDataHandling.status.carsError = {message: 'Network Error'};

    const {getByText} = render(<DataListScreen />);

    expect(getByText('😥 Error loading cars: Network Error')).toBeTruthy();
  });

  it('displays no cars message when list is empty', async () => {
    mockUseCarDataHandling.cars = [];
    mockUseCarDataHandling.status.carsError = null;

    const {getByText} = render(<DataListScreen />);

    expect(getByText('😥 No cars available.')).toBeTruthy();
  });

  it('calls setShowOnlyUserCars when myCars param is set', () => {
    (useRoute as jest.Mock).mockReturnValue({params: {myCars: true}});
    const setShowOnlyUserCars =
      mockUseCarDataHandling.filters.filterFunctions.setShowOnlyUserCars;

    render(<DataListScreen />);

    expect(setShowOnlyUserCars).toHaveBeenCalledWith(true);
  });
});
