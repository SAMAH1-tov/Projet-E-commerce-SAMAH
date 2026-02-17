import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Product } from '../models/product';


const API_URL = environment.apiUrl + 'products/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  findAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(API_URL + "findAll");
  }

  save(Product: Product): Observable<Product> {
    return this.http.post<Product>(API_URL + "save", Product);
  }

  findById(id: any): Observable<Product> {
    return this.http.get<Product>(API_URL + "findById/" + id);
  }

  update(Product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(API_URL + "update/" + id, Product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + "delete/" + id);
  }
}
