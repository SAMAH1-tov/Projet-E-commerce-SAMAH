import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Order } from '../models/order';

const API_URL = environment.apiUrl + 'orders/';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private http = inject(HttpClient);
    
      findAll(): Observable<Array<Order>> {
        return this.http.get<Array<Order>>(API_URL + "findAll");
      }
    
      save(Order: Order): Observable<Order> {
        return this.http.post<Order>(API_URL + "save", Order);
      }
    
      findById(id: any): Observable<Order> {
        return this.http.get<Order>(API_URL + "findById/" + id);
      }
    
      update(Order: Order, id: number): Observable<Order> {
        return this.http.put<Order>(API_URL + "update/" + id, Order);
      }
    
      delete(id: number): Observable<void> {
        return this.http.delete<void>(API_URL + "delete/" + id);
      }
}
