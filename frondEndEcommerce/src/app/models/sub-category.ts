import {Category} from './category';
import {Product} from './product';

export class SubCategory {
  id: number;
  name: string;
  description: string;
  category: Category;
  products: Product[];
}
