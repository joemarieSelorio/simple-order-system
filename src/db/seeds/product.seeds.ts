import { ProductM } from '../../products/model/product.model';
import { v4 as uuidv4 } from 'uuid';

export const ProductSeeds: ProductM[] = [
  {
    uuid: uuidv4(),
    name: 'Fried Chicken',
    quantity: 100,
  },
  {
    uuid: uuidv4(),
    name: 'Spaghetti',
    quantity: 100,
  },
  {
    uuid: uuidv4(),
    name: 'Pizza',
    quantity: 100,
  },
  {
    uuid: uuidv4(),
    name: 'Burger',
    quantity: 100,
  },
];
