import {Order} from './order';
import {Gallery} from './gallery';
import {Provider} from './provider';
import {SubCategory} from './sub-category';

export class Product {
  id: number;
  ref: string;
  description: string;
  quantity: number;
  price: number;
  gallery?: Gallery;
  provider?: Provider;
  orders?: Order;
  subcategory?: SubCategory;

}
