import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { UserService } from '../../../Services/user-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnInit {
  currentUser$: Observable<any>;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.currentUser$ = this.userService.currentUser$;
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.currentUser$.subscribe(user => {
      if (user) {
        console.log('User data updated in sidebar:', user);
      }
    });
  }

  loadCurrentUser(): void {
    let user = this.userService.getCurrentUser();
    console.log('User from UserService:', user);
    
    if (!user) {
      const token = this.authService.getToken();
      console.log('Token from AuthService:', token);
      
      if (token) {
        user = this.decodeJWT(token);
        console.log('User from JWT decode:', user);
        
        if (user) {
          this.userService.setCurrentUser(user);
        }
      }
    }
    
    if (user) {
      console.log('Final user loaded in sidebar:', user);
    }
  }

  decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);
      
      console.log('JWT decoded:', decoded);
      

      const username = decoded.username || decoded.sub || decoded.name || decoded.email;
      const email = decoded.email || '';
      const role = decoded.role || decoded.authorities?.[0]?.authority || 'CLIENT';
      
      console.log('Extracted from JWT:', { username, email, role });
      
      return {
        username: username,           
        name: username,             
        email: email,               
        role: role,                 
        exp: decoded.exp,           
        sub: decoded.sub            
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  getUserDisplayName(): string {
    const user = this.authService.getCurrentUser();
    if (!user) return 'Utilisateur';
    
    return user.name || user.username || user.email || user.sub || 'Utilisateur';
  }

  returnName(): string {
    const user = this.authService.getCurrentUser();
    console.log('User in returnName():', user);
    console.log('User.username:', user?.username);
    console.log('User.name:', user?.name);
    console.log('User.email:', user?.email);
    console.log('User.sub:', user?.sub);
    
    if (!user) return 'Utilisateur';
    
    // Priorité: username > name > email > sub
    const result = user.username || user.name || user.email || user.sub || 'Utilisateur';
    console.log('Final returnName result:', result);
    
    return result;
  }

  getUserEmail(): string {
    const user = this.authService.getCurrentUser();
    if (!user) return '';
    return user.email || user.sub || '';
  }

  getInitials(): string {
    const user = this.authService.getCurrentUser();
    if (!user) return 'U';
    
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

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signIn']);
  }

  getTokenExpirationTime(): Date | null {
    const user = this.authService.getCurrentUser();
    if (!user || !user.exp) return null;
    return new Date(user.exp * 1000);
  }

  isAdmin(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;
    
    // Vérifier le rôle de l'utilisateur
    return user.role === 'ADMIN' || user.role === 'admin';
  }
}
