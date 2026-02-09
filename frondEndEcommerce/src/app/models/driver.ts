import {Account} from './account';
import {Order} from './order';

export class Driver extends Account{
  adresse: string;
  orders: Order[];
}
