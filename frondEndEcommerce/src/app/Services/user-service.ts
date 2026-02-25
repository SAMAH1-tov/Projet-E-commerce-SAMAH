import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    // Priorité: utilisateur courant > null
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      return currentUser;
    }
    
    return null;
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
  }

  getUserDisplayName(): string {
    const user = this.getCurrentUser();
    if (!user) return 'Utilisateur';
    
    // Priorité: name > username > email > sub
    return user.name || user.username || user.email || user.sub || 'Utilisateur';
  }

  returnName(): string {
    const user = this.getCurrentUser();
    if (!user) return 'Utilisateur';
    
    // Priorité: name (prénom + nom) > username > email > sub
    return user.name || user.username || user.email || user.sub || 'Utilisateur';
  }

  getUserEmail(): string {
    const user = this.getCurrentUser();
    if (!user) return '';
    return user.email || user.sub || '';
  }

  getInitials(user?: any): string {
    const currentUser = user || this.getCurrentUser();
    if (!currentUser) return 'U';
    
    const displayName = this.returnName();
    if (displayName && displayName !== 'Utilisateur') {
      const names = displayName.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return displayName.substring(0, 2).toUpperCase();
    }
    
    // Essayer avec email
    const email = this.getUserEmail();
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    
    return 'US';
  }
}
