import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Client } from '../models/client';

const API_URL = environment.apiUrl + 'clients/';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);
        
    findAll(): Observable<Array<Client>> {
      return this.http.get<Array<Client>>(API_URL + "findAll");
    }
  
    save(Client: Client): Observable<Client> {
      return this.http.post<Client>(API_URL + "save", Client);
    }
  
    findById(id: any): Observable<Client> {
      return this.http.get<Client>(API_URL + "findById/" + id);
    }
  
    update(Client: Client, id: number): Observable<Client> {
      return this.http.put<Client>(API_URL + "update/" + id, Client);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(API_URL + "delete/" + id);
    }
}
