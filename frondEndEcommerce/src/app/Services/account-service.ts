import {inject, Injectable} from '@angular/core';
import { Account } from '../models/account';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const API_URL = environment.apiUrl + 'accounts/';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  findAll(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(API_URL+"findAll");
  }

  save(account: Account): Observable<Account> {
    return this.http.post<Account>(API_URL+"save" , account);
  }

  findById(id: any): Observable<Account> {
    return this.http.get<Account>(API_URL  + id);
  }

  update(account: Account, id: number): Observable<Account> {
    return this.http.put<Account>(API_URL +"update/"+ id, account);
  }
  delete(id: number): Observable<Account> {
    return this.http.delete<Account>(API_URL +"delete/"+ id);
  }

}
