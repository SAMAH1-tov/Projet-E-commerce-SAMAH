import {Client} from './client';
import {Product} from './product';
import {Driver} from './driver';

export class Order {
  id: string;
  ref: string;
  description: string;
  quantity_total: number;
  price_total: number;
  state: string;
  products: Product[] = [];
  client: Client;
  driver: Driver;
}
