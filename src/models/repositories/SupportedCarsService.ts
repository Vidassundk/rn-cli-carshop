import axios from 'axios';
import {SupportedCar} from '../entities/SupportedCar';

const BRANDS_AND_MODELS_URL =
  'http://localhost:3001/supportedCarBrandsAndModels';

export const getSupportedCarBrandsAndModels = async (): Promise<
  SupportedCar[]
> => {
  const {data} = await axios.get(BRANDS_AND_MODELS_URL);
  return data;
};
