import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login response in component:', response);
        if (response && response.token) {
          console.log('Login successful, navigating to dashboard...');
          this.router.navigate(['dashboard']);
        } else {
          console.error('No token in response');
          this.errorMessage = 'Erreur lors de la connexion';
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Email ou mot de passe incorrect';
        this.isLoading = false;
      }
    });
  }
}
