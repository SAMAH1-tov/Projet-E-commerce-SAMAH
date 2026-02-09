import { Routes } from '@angular/router';
import {Dashboard} from './Pages/dashboard/dashboard';
import {ClientList} from './Pages/Client/client-list/client-list';
import {DriverList} from './Pages/Driver/driver-list/driver-list';
import {CategoryList} from './Pages/Category/category-list/category-list';
import {OrderList} from './Pages/Order/order-list/order-list';
import {ProductList} from './Pages/Product/product-list/product-list';
import {ProviderList} from './Pages/Provider/provider-list/provider-list';
import {SubCategory} from './models/sub-category';

export const routes: Routes = [
  { path:"",component:Dashboard},
  { path:"client-list",component:ClientList },
  { path:"driver-list",component:DriverList },
  { path:"category-list",component:CategoryList },
  { path:"order-list",component:OrderList },
  { path:"product-list",component:ProductList },
  { path:"provider-list",component:ProviderList },
  { path:"subcategory-list",component:SubCategory},
];
