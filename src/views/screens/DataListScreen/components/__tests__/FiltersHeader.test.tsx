import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {
  FilterFunctions,
  FilterOptions,
  Filters,
} from '@/viewmodels/handling/viewCars/useCarFilters';
import {ThemeProvider} from '@/viewmodels/context/ThemeContext';
import FiltersHeader from '../FiltersHeader';

const mockFilters: Filters = {
  areFiltersActive: true,
  showOnlyUserCars: false,
  filterBrand: '',
  filterModel: '',
  filterYearFrom: null,
  filterYearTo: null,
  filterGearbox: '',
  filterColor: '',
};

const mockFilterFunctions: FilterFunctions = {
  resetFilters: jest.fn(),
  setShowOnlyUserCars: jest.fn(),
  setFilterBrand: jest.fn(),
  setFilterModel: jest.fn(),
  setFilterYearFrom: jest.fn(),
  setFilterYearTo: jest.fn(),
  setFilterGearbox: jest.fn(),
  setFilterColor: jest.fn(),
};

const mockFilterOptions: FilterOptions = {
  brandOptions: ['Toyota', 'Honda'],
  modelOptions: ['Corolla', 'Civic'],
  yearOptions: [2000, 2021],
  gearboxOptions: ['Manual', 'Automatic'],
  colorOptions: ['Red', 'Blue', 'Green'],
};

const mockToggleModal = jest.fn();

describe('FiltersHeader Component', () => {
  const renderComponent = () =>
    render(
      <ThemeProvider>
        <FiltersHeader
          filters={mockFilters}
          filterFunctions={mockFilterFunctions}
          filterOptions={mockFilterOptions}
          toggleModal={mockToggleModal}
          visibleModal={null}
        />
      </ThemeProvider>,
    );

  it('renders correctly', () => {
    const {getByText} = renderComponent();

    expect(getByText('Filter:')).toBeTruthy();
    expect(getByText('Reset Filters')).toBeTruthy();
    expect(getByText('All Cars')).toBeTruthy();
    expect(getByText('All Brand')).toBeTruthy();
    expect(getByText('All Model')).toBeTruthy();
    expect(getByText('All From Year')).toBeTruthy();
    expect(getByText('All To Year')).toBeTruthy();
    expect(getByText('All Gearbox')).toBeTruthy();
    expect(getByText('All Color')).toBeTruthy();
  });

  it('opens the brand modal when the "All Brand" button is pressed', () => {
    const {getByText} = renderComponent();

    const brandButton = getByText('All Brand');
    fireEvent.press(brandButton);

    expect(mockToggleModal).toHaveBeenCalledWith('brand');
  });

  it('opens the model modal when the "All Model" button is pressed', () => {
    const {getByText} = renderComponent();

    const modelButton = getByText('All Model');
    fireEvent.press(modelButton);

    expect(mockToggleModal).toHaveBeenCalledWith('model');
  });

  it('opens the year from modal when the "All From Year" button is pressed', () => {
    const {getByText} = renderComponent();

    const yearFromButton = getByText('All From Year');
    fireEvent.press(yearFromButton);

    expect(mockToggleModal).toHaveBeenCalledWith('yearFrom');
  });

  it('opens the year to modal when the "All To Year" button is pressed', () => {
    const {getByText} = renderComponent();

    const yearToButton = getByText('All To Year');
    fireEvent.press(yearToButton);

    expect(mockToggleModal).toHaveBeenCalledWith('yearTo');
  });

  it('opens the gearbox modal when the "All Gearbox" button is pressed', () => {
    const {getByText} = renderComponent();

    const gearboxButton = getByText('All Gearbox');
    fireEvent.press(gearboxButton);

    expect(mockToggleModal).toHaveBeenCalledWith('gearbox');
  });

  it('opens the color modal when the "All Color" button is pressed', () => {
    const {getByText} = renderComponent();

    const colorButton = getByText('All Color');
    fireEvent.press(colorButton);

    expect(mockToggleModal).toHaveBeenCalledWith('color');
  });
});
