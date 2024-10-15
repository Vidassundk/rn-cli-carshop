export interface SupportedCarModel {
  name: string;
  image: string;
}

export interface SupportedCar {
  brand: string;
  brandImage: string;
  models: SupportedCarModel[];
}
