import {Account} from './account';
import {Order} from './order';


export class Client extends Account{
  localization: string;
  orders: Order[] = [];
}
