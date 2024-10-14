import axios from 'axios';
import {Car} from '../entities/Car';

const API_URL = 'http://localhost:3001/carsPosted';
const BRANDS_AND_MODELS_URL =
  'http://localhost:3001/supportedCarBrandsAndModels';

export const getCars = async (): Promise<Car[]> => {
  const {data} = await axios.get(API_URL);
  return data;
};

export const addCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  const {data} = await axios.post(API_URL, car);
  return data;
};

export const updateCar = async (car: Car): Promise<Car> => {
  const {data} = await axios.put(`${API_URL}/${car.id}`, car);
  return data;
};

export const deleteCar = (id: Car['id']) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getSupportedCarBrandsAndModels = async (): Promise<
  {brand: string; models: string[]}[]
> => {
  const {data} = await axios.get(BRANDS_AND_MODELS_URL);
  return data;
};
