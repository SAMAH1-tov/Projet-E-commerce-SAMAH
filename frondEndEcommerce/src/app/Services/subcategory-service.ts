import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { SubCategory } from '../models/sub-category';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl + 'subcategories/';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private http = inject(HttpClient);

  findAll(): Observable<Array<SubCategory>> {
    return this.http.get<Array<SubCategory>>(API_URL + "findAll").pipe(
      catchError(this.handleError)
    );
  }

  save(SubCategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(API_URL + "save", SubCategory).pipe(
      catchError(this.handleError)
    );
  }

  findById(id: any): Observable<SubCategory> {
    return this.http.get<SubCategory>(API_URL + "findById/" + id).pipe(
      catchError(this.handleError)
    );
  }

  update(SubCategory: SubCategory, id: number): Observable<SubCategory> {
    return this.http.put<SubCategory>(API_URL + "update/" + id, SubCategory).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + "delete/" + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Subcategory Service Error:', error);
    
    // Si le statut est 200 mais qu'il y a une erreur, c'est probablement un problème de parsing
    if (error.status === 200 && error.error instanceof Error) {
      console.error('Response parsing error:', error.error);
      return throwError(() => new Error('Erreur de parsing de la réponse du serveur'));
    }
    
    // Erreur HTTP standard
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
