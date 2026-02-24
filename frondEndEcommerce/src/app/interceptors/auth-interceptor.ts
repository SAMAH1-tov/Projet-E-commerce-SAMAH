import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log('Intercepting request:', request.url);
    console.log('Token available:', !!token);

    // Si le token existe, on clone la requête pour y ajouter le header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` 
        }
      });
      console.log('Token added to request:', token.substring(0, 20) + '...');
    } else {
      console.warn('No token available for request:', request.url);
    }

    // On passe la requête (originale ou clonée) au handler suivant
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error.status, error.url);
        
        // Si on reçoit une erreur 401 (Unauthorized) ou 403 (Forbidden)
        if (error.status === 401 || error.status === 403) {
          console.log('Auth error - Logging out user');
          // On déconnecte l'utilisateur
          this.authService.logout();
          // On le redirige vers la page de connexion
          this.router.navigate(['/signIn']);
          console.error('Session expirée ou invalide. Déconnexion automatique.');
        }
        // On propage l'erreur pour que le service qui a fait l'appel puisse aussi la gérer
        return throwError(() => error);
      })
    );
  }
}