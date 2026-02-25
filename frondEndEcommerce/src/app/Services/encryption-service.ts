import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  
  // Méthode simple de cryptage (basée sur celle utilisée dans l'inscription)
  encryptPassword(password: string): string {
    if (!password) return '';
    
    // Utiliser btoa pour un cryptage simple (même méthode que l'inscription)
    try {
      // Ajouter un sel pour plus de sécurité
      const salt = 'Ecommerce_Salt_2024';
      const saltedPassword = password + salt;
      return btoa(saltedPassword);
    } catch (error) {
      console.error('Error encrypting password:', error);
      return password; // Fallback en cas d'erreur
    }
  }

  // Méthode de décryptage
  decryptPassword(encryptedPassword: string): string {
    if (!encryptedPassword) return '';
    
    try {
      const decoded = atob(encryptedPassword);
      const salt = 'Ecommerce_Salt_2024';
      return decoded.replace(salt, '');
    } catch (error) {
      console.error('Error decrypting password:', error);
      return encryptedPassword; // Fallback en cas d'erreur
    }
  }

  // Vérifier si un mot de passe est crypté
  isEncrypted(password: string): boolean {
    if (!password) return false;
    
    try {
      // Tenter de décoder, si ça échoue c'est probablement crypté
      atob(password);
      return false; // Si on peut décoder, ce n'est pas crypté
    } catch (error) {
      return true; // Si on ne peut pas décoder, c'est crypté
    }
  }
}
