import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { CommonModule } from '@angular/common';
import { EncryptionService } from '../../../Services/encryption-service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  phone: string = '';
  localization: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private encryptionService: EncryptionService) {}

  onRegister(): void {
    if (!this.email || !this.password || !this.confirmPassword || !this.firstName || !this.lastName || !this.username || !this.localization) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Crypter le mot de passe avant de l'envoyer
    const encryptedPassword = this.encryptionService.encryptPassword(this.password);

    const credentials = {
      email: this.email,
      password: encryptedPassword, // Mot de passe crypté
      username: this.username,
      phone: this.phone,
      firstName: this.firstName,
      lastName: this.lastName,
      localization: this.localization,
      role: 'CLIENT'
    };

    console.log('Registering with encrypted password:', {
      ...credentials,
      password: '[ENCRYPTED]' // Masquer le mot de passe crypté dans les logs
    });

    this.authService.register(credentials).subscribe({
      next: (response: any) => {
        this.successMessage = 'Inscription réussie ! Redirection vers la connexion...';
        setTimeout(() => {
          this.router.navigate(['signIn']);
        }, 2000);
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }
}
