import axios from 'axios';
import {getSupportedCarBrandsAndModels} from '../SupportedCarsService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SupportedCarsService', () => {
  describe('getSupportedCarBrandsAndModels', () => {
    it('should fetch supported car brands and models successfully', async () => {
      const mockData = [
        {
          brand: 'Tesla',
          brandImage: 'https://example.com/tesla.png',
          models: [
            {name: 'Model S', image: 'https://example.com/model_s.png'},
            {name: 'Model 3', image: 'https://example.com/model_3.png'},
          ],
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({data: mockData});
      const result = await getSupportedCarBrandsAndModels();
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:3001/supportedCarBrandsAndModels',
      );
    });

    it('should handle errors properly', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
      await expect(getSupportedCarBrandsAndModels()).rejects.toThrow(
        'Network Error',
      );
    });
  });
});
