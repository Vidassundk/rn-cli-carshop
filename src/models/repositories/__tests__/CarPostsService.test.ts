import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Car} from '../../entities/Car';
import {addCar, deleteCar, getCars, updateCar} from '../CarPostsService';

const mock = new MockAdapter(axios);

describe('CarService', () => {
  const API_URL = 'http://localhost:3001/carsPosted';
  const mockCar: Car = {
    id: '123',
    brand: 'Toyota',
    model: 'Corolla',
    makeYear: 2020,
    gearbox: 'Automatic',
    color: 'Red',
    photoUrl: 'some-url',
    userId: 'user1',
    datePosted: '2022-10-10',
  };

  afterEach(() => {
    mock.reset();
  });

  it('should fetch cars successfully', async () => {
    mock.onGet(API_URL).reply(200, [mockCar]);
    const cars = await getCars();
    expect(cars).toHaveLength(1);
    expect(cars[0]).toEqual(mockCar);
  });

  it('should return an error when fetching cars fails', async () => {
    mock.onGet(API_URL).reply(500);
    await expect(getCars()).rejects.toThrow();
  });

  it('should add a car successfully', async () => {
    const newCar = {...mockCar, id: undefined};
    mock.onPost(API_URL).reply(200, {...mockCar, id: '124'});
    const addedCar = await addCar(newCar);
    expect(addedCar.id).toBe('124');
    expect(addedCar.brand).toBe(newCar.brand);
  });

  it('should return an error when adding a car fails', async () => {
    mock.onPost(API_URL).reply(500);
    const newCar = {...mockCar, id: undefined};
    await expect(addCar(newCar)).rejects.toThrow();
  });

  it('should update a car successfully', async () => {
    const updatedCar = {...mockCar, color: 'Blue'};
    mock.onPut(`${API_URL}/${mockCar.id}`).reply(200, updatedCar);
    const result = await updateCar(updatedCar);
    expect(result.color).toBe('Blue');
  });

  it('should return an error when updating a car fails', async () => {
    mock.onPut(`${API_URL}/${mockCar.id}`).reply(500);
    const updatedCar = {...mockCar, color: 'Blue'};
    await expect(updateCar(updatedCar)).rejects.toThrow();
  });

  it('should delete a car successfully', async () => {
    mock.onDelete(`${API_URL}/${mockCar.id}`).reply(200);
    await expect(deleteCar(mockCar.id)).resolves.not.toThrow();
  });

  it('should return an error when deleting a car fails', async () => {
    mock.onDelete(`${API_URL}/${mockCar.id}`).reply(500);
    await expect(deleteCar(mockCar.id)).rejects.toThrow();
  });
});
