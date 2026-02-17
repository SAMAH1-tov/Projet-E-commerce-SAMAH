import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Provider } from '../models/provider';


const API_URL = environment.apiUrl + 'providers/';
@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private http = inject(HttpClient);
  
    findAll(): Observable<Array<Provider>> {
      return this.http.get<Array<Provider>>(API_URL + "findAll");
    }
  
    save(Provider: Provider): Observable<Provider> {
      return this.http.post<Provider>(API_URL + "save", Provider);
    }
  
    findById(id: any): Observable<Provider> {
      return this.http.get<Provider>(API_URL + "findById/" + id);
    }
  
    update(Provider: Provider, id: number): Observable<Provider> {
      return this.http.put<Provider>(API_URL + "update/" + id, Provider);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(API_URL + "delete/" + id);
    }
  
}
