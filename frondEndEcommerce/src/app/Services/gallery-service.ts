import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Gallery } from '../models/gallery';

const API_URL = environment.apiUrl + 'galleries/';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private http = inject(HttpClient);
          
    findAll(): Observable<Array<Gallery>> {
      return this.http.get<Array<Gallery>>(API_URL + "findAll");
    }
  
    save(Gallery: Gallery): Observable<Gallery> {
      return this.http.post<Gallery>(API_URL + "save", Gallery);
    }
  
    findById(id: any): Observable<Gallery> {
      return this.http.get<Gallery>(API_URL + "findById/" + id);
    }
  
    update(Gallery: Gallery, id: number): Observable<Gallery> {
      return this.http.put<Gallery>(API_URL + "update/" + id, Gallery);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(API_URL + "delete/" + id);
    }

  uploadImage(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${API_URL}${id}/upload`, formData, { responseType: 'text' });
  }

}
