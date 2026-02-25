import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user-service';
import { EncryptionService } from './encryption-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'api/v1/auth';

  constructor(private http: HttpClient, private userService: UserService, private encryptionService: EncryptionService) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token, response.username, response.email, response.role);
        } else {
          console.error('No token in login response');
        }
      })
    );
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  saveToken(token: string, username: string, email?: string, role?: string): void {
    localStorage.setItem('authToken', token);
    
    // Créer un objet utilisateur complet avec les données du backend
    const user = {
      username: username,        // Username depuis backend (firstName + lastName)
      name: username,          // Utiliser le username comme name pour l'affichage
      email: email || '',      // Email depuis backend
      role: role || 'CLIENT', // Role depuis backend
      sub: username            // Subject du JWT
    };
    
    console.log('User data saved:', user); // Debug
    
    // Stocker dans UserService
    this.userService.setCurrentUser(user);
    
    // Aussi stocker dans localStorage pour la persistance
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    return token;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.userService.clearUser();
  }

  isLoggedIn(): boolean {
    const loggedIn = !!this.getToken();
    return loggedIn;
  }

  checkSessionStatus(): { 
    isLoggedIn: boolean; 
    hasToken: boolean; 
    tokenExpired: boolean; 
    currentUser: any;
  } {
    const token = this.getToken();
    const currentUser = this.userService.getCurrentUser();
    const hasToken = !!token;
    const tokenExpired = this.isTokenExpired();
    const isLoggedIn = hasToken && !tokenExpired;
    
    return {
      isLoggedIn,
      hasToken,
      tokenExpired,
      currentUser
    };
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    
    try {
      // Décoder le JWT directement ici
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);
      
      if (!decoded || !decoded.exp) {
        return true;
      }
      
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  getCurrentUser(): any {
    // Essayer d'abord depuis UserService
    let user = this.userService.getCurrentUser();
    
    if (!user) {
      // Si UserService est vide, essayer depuis localStorage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          user = JSON.parse(storedUser);
          // Mettre à jour UserService avec les données du localStorage
          this.userService.setCurrentUser(user);
        } catch (error) {
          console.error('Error parsing stored user:', error);
        }
      }
    }
    
    return user;
  }

  getDecryptedPassword(encryptedPassword: string): string {
    if (!encryptedPassword) return '';
    
    // Utiliser le EncryptionService pour décrypter
    return this.encryptionService.decryptPassword(encryptedPassword);
  }
}