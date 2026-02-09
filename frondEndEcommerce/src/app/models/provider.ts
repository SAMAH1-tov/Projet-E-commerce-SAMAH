import {Account} from './account';
import {Product} from './product';

export class Provider extends Account {
  company: string;
  products: Product[];
}
