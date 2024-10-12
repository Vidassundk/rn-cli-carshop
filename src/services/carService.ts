import axios from 'axios';
import {Car} from '../models/Car';

const API_URL = 'http://localhost:3001/cars';

// Get all cars
export const getCars = async (): Promise<Car[]> => {
  const {data} = await axios.get(API_URL);
  return data;
};

// Add a new car
export const addCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  const {data} = await axios.post(API_URL, car);
  return data;
};

// Update an existing car
export const updateCar = async (car: Car): Promise<Car> => {
  const {data} = await axios.put(`${API_URL}/${car.id}`, car);
  return data;
};

// Delete a car
export const deleteCar = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
