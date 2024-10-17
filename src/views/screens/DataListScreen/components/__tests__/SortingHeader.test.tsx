import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SortingHeader from '../SortingHeader';
import {ThemeProvider} from '@/viewmodels/context/ThemeContext';
import {
  Sorts,
  SortingFunctions,
} from '@/viewmodels/handling/viewCars/useCarSorting';

const mockSorts: Sorts = {
  sortBy: null,
  sortDirection: 'desc',
};

const mockSortingFunctions: SortingFunctions = {
  setSortBy: jest.fn(),
  setSortDirection: jest.fn(),
};

const mockToggleModal = jest.fn();

describe('SortingHeader Component', () => {
  const renderComponent = (sorts: Sorts = mockSorts) =>
    render(
      <ThemeProvider>
        <SortingHeader
          sorts={sorts}
          sortingFunctions={mockSortingFunctions}
          toggleModal={mockToggleModal}
          visibleModal={null}
        />
      </ThemeProvider>,
    );

  it('renders the correct label and buttons', () => {
    const {getByText} = renderComponent();

    expect(getByText('Sort:')).toBeTruthy();
    expect(getByText('Sort by Relevance')).toBeTruthy();
  });

  it('calls toggleModal with "sortBy" when the Sort by button is pressed', () => {
    const {getByText} = renderComponent();

    const sortByButton = getByText('Sort by Relevance');
    fireEvent.press(sortByButton);

    expect(mockToggleModal).toHaveBeenCalledWith('sortBy');
  });

  it('calls setSortBy when a new sort option is selected', () => {
    const sortsWithSortBy: Sorts = {
      sortBy: 'makeYear',
      sortDirection: 'desc',
    };
    const {getByText} = renderComponent(sortsWithSortBy);

    expect(getByText('Sort by Make Year')).toBeTruthy();
  });

  it('displays the sort direction button when a sortBy option is selected', () => {
    const sortsWithSortBy: Sorts = {
      sortBy: 'makeYear',
      sortDirection: 'desc',
    };
    const {getByText} = renderComponent(sortsWithSortBy);

    const sortDirectionButton = getByText('Newest');
    fireEvent.press(sortDirectionButton);

    expect(mockSortingFunctions.setSortDirection).toHaveBeenCalledWith('asc');
  });

  it('toggles sort direction between "Newest" and "Oldest"', () => {
    const sortsWithAscDirection: Sorts = {
      sortBy: 'datePosted',
      sortDirection: 'asc',
    };
    const {getByText} = renderComponent(sortsWithAscDirection);

    const sortDirectionButton = getByText('Oldest');
    fireEvent.press(sortDirectionButton);

    expect(mockSortingFunctions.setSortDirection).toHaveBeenCalledWith('desc');
  });

  it('does not display sort direction button when sortBy is null', () => {
    const {queryByText} = renderComponent();

    expect(queryByText('Newest')).toBeNull();
    expect(queryByText('Oldest')).toBeNull();
  });
});
