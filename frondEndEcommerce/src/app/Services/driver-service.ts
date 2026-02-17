import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Driver } from '../models/driver';


const API_URL = environment.apiUrl + 'drivers/';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
      private http = inject(HttpClient);
      
        findAll(): Observable<Array<Driver>> {
          return this.http.get<Array<Driver>>(API_URL + "findAll");
        }
      
        save(Driver: Driver): Observable<Driver> {
          return this.http.post<Driver>(API_URL + "save", Driver);
        }
      
        findById(id: any): Observable<Driver> {
          return this.http.get<Driver>(API_URL + "findById/" + id);
        }
      
        update(Driver: Driver, id: number): Observable<Driver> {
          return this.http.put<Driver>(API_URL + "update/" + id, Driver);
        }
      
        delete(id: number): Observable<void> {
          return this.http.delete<void>(API_URL + "delete/" + id);
        }
}
