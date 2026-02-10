import { Routes } from '@angular/router';
import {Dashboard} from './Pages/dashboard/dashboard';
import {ClientList} from './Pages/Client/client-list/client-list';
import {DriverList} from './Pages/Driver/driver-list/driver-list';
import {CategoryList} from './Pages/Category/category-list/category-list';
import {OrderList} from './Pages/Order/order-list/order-list';
import {ProductList} from './Pages/Product/product-list/product-list';
import {ProviderList} from './Pages/Provider/provider-list/provider-list';
import {SubCategory} from './models/sub-category';
import {AccountList} from './Pages/Account/account-list/account-list';
import {EditAccount} from './Pages/Account/edit-account/edit-account';
import {EditClient} from './Pages/Client/edit-client/edit-client';
import {EditDriver} from './Pages/Driver/edit-driver/edit-driver';
import {EditCategory} from './Pages/Category/edit-category/edit-category';
import {EditOrder} from './Pages/Order/edit-order/edit-order';
import {EditProduct} from './Pages/Product/edit-product/edit-product';
import {EditProvider} from './Pages/Provider/edit-provider/edit-provider';
import {EditSubcategory} from './Pages/SubCategory/edit-subcategory/edit-subcategory';
import {CreateAccount} from './Pages/Account/create-account/create-account';
import {CreateClient} from './Pages/Client/create-client/create-client';
import {CreateDriver} from './Pages/Driver/create-driver/create-driver';
import {CreateCategory} from './Pages/Category/create-category/create-category';
import {CreateOrder} from './Pages/Order/create-order/create-order';
import {CreateProduct} from './Pages/Product/create-product/create-product';
import {CreateProvider} from './Pages/Provider/create-provider/create-provider';
import {CreateSubcategory} from './Pages/SubCategory/create-subcategory/create-subcategory';

export const routes: Routes = [
  { path:"",component:Dashboard},
  { path:"account-list",component:AccountList },
  { path:"client-list",component:ClientList },
  { path:"driver-list",component:DriverList },
  { path:"category-list",component:CategoryList },
  { path:"order-list",component:OrderList },
  { path:"product-list",component:ProductList },
  { path:"provider-list",component:ProviderList },
  { path:"subcategory-list",component:SubCategory},

  { path:"create-account",component:CreateAccount },
  { path:"create-client",component: CreateClient },
  { path:"create-driver",component:CreateDriver },
  { path:"create-category",component:CreateCategory },
  { path:"create-order",component:CreateOrder },
  { path:"create-product",component:CreateProduct },
  { path:"create-provider",component:CreateProvider },
  { path:"create-subcategory",component:CreateSubcategory},


  { path:"edit-account",component:EditAccount },
  { path:"edit-client",component: EditClient },
  { path:"edit-driver",component:EditDriver },
  { path:"edit-category",component:EditCategory },
  { path:"edit-order",component:EditOrder },
  { path:"edit-product",component:EditProduct },
  { path:"edit-provider",component:EditProvider },
  { path:"edit-subcategory",component:EditSubcategory},
];
