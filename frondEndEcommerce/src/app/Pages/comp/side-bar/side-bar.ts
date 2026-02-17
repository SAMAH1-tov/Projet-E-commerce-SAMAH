import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnInit {
  currentUser: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    try {
      this.currentUser = this.authService.getCurrentUser();
      if (!this.currentUser) {
        console.log('Aucun utilisateur connecté');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'utilisateur:', error);
    }
  }

  // Get initials for avatar fallback
  getInitials(): string {
    if (this.currentUser?.firstName && this.currentUser?.lastName) {
      return (this.currentUser.firstName[0] + this.currentUser.lastName[0]).toUpperCase();
    }
    return 'U';
  }
}
