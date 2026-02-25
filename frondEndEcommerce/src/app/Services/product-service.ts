import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Product } from '../models/product';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


const API_URL = environment.apiUrl + 'products/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  findAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(API_URL + "findAll").pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  save(Product: Product): Observable<Product> {
    return this.http.post<Product>(API_URL + "save", Product).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  findById(id: any): Observable<Product> {
    return this.http.get<Product>(API_URL + "findById/" + id).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  update(Product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(API_URL + "update/" + id, Product).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + "delete/" + id).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Product Service Error:', error);

    if (error.status === 200 && error.error instanceof Error) {
      console.error('Response parsing error:', error.error);
      return throwError(() => new Error('Erreur de parsing de la réponse du serveur'));
    }

    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
