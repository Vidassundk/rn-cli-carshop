import {renderHook} from '@testing-library/react-hooks';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {useSupportedCarsService} from '../useSupportedCarService';
import React from 'react';
import {waitFor} from '@testing-library/react-native';
import {getSupportedCarBrandsAndModels} from '../../../models/repositories/SupportedCarsService';

jest.mock('../../../models/repositories/SupportedCarsService');

const mockGetSupportedCarBrandsAndModels =
  getSupportedCarBrandsAndModels as jest.Mock;

describe('useSupportedCarsService', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({children}: {children: React.ReactNode}) => {
    return React.createElement(
      QueryClientProvider,
      {client: queryClient},
      children,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('should fetch supported car brands and models successfully', async () => {
    const supportedCarsMockData = [
      {
        brand: 'Toyota',
        brandImage: 'https://example.com/toyota.png',
        models: [
          {name: 'Corolla', image: 'https://example.com/corolla.png'},
          {name: 'Camry', image: 'https://example.com/camry.png'},
        ],
      },
    ];

    mockGetSupportedCarBrandsAndModels.mockResolvedValue(supportedCarsMockData);

    const {result} = renderHook(() => useSupportedCarsService(), {
      wrapper,
    });

    await waitFor(() => {
      expect(
        result.current.supportedBrandsAndModels.supportedCarBrandsAndModels,
      ).toEqual(supportedCarsMockData);
    });

    expect(result.current.supportedBrandsAndModels.isBrandsLoading).toBe(false);
    expect(result.current.supportedBrandsAndModels.brandsError).toBeNull();
  });

  it('should handle error while fetching supported car brands and models', async () => {
    const errorMessage = 'Failed to fetch supported car brands and models';

    mockGetSupportedCarBrandsAndModels.mockRejectedValueOnce(
      new Error(errorMessage),
    );

    const {result} = renderHook(() => useSupportedCarsService(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.supportedBrandsAndModels.brandsError).toBeTruthy();
    });

    expect(result.current.supportedBrandsAndModels.isBrandsLoading).toBe(false);
    expect(result.current.supportedBrandsAndModels.brandsError?.message).toBe(
      errorMessage,
    );
  });
});
