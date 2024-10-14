export interface Car {
  id: string;
  userId: string;
  brand: string;
  model: string;
  gearbox: 'Automatic' | 'Manual';
  color: string;
  makeYear: number;
  datePosted: string;
  photoUrl: string;
}
