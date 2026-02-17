import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Category } from '../models/category';


const API_URL = environment.apiUrl + 'categories/';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  
    findAll(): Observable<Array<Category>> {
      return this.http.get<Array<Category>>(API_URL + "findAll");
    }
  
    save(Category: Category): Observable<Category> {
      return this.http.post<Category>(API_URL + "save", Category);
    }
  
    findById(id: any): Observable<Category> {
      return this.http.get<Category>(API_URL + "findById/" + id);
    }
  
    update(Category: Category, id: number): Observable<Category> {
      return this.http.put<Category>(API_URL + "update/" + id, Category);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(API_URL + "delete/" + id);
    }
}
