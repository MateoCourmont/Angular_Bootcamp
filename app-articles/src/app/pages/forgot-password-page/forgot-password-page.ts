import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password-page.html',
})
export class ForgotPasswordPage {
  email: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    if (!this.email || !this.newPassword || !this.newPasswordConfirm) {
      return this.showErrorMessage('Tous les champs sont obligatoires.');
    }

    if (this.newPassword !== this.newPasswordConfirm) {
      return this.showErrorMessage('Les mots de passe ne correspondent pas.');
    }

    this.authService.forgotPasswordCustom(this.email, this.newPassword, this.newPasswordConfirm)
      .subscribe({
        next: (res: any) => {  
          if (res.code === '200') {
            this.showSuccessMessage(res.message);

            // Rediriger vers login après 1s
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);


          } else {
            this.showErrorMessage(res.message || 'Erreur lors de la réinitialisation.');
          }
        },
        error: () => this.showErrorMessage('Erreur serveur ou email inexistant.')
      });
  } // <-- fermeture de resetPassword

  private showSuccessMessage(msg: string) {
    this.successMessage = msg;
    this.errorMessage = '';
  }

  private showErrorMessage(msg: string) {
    this.errorMessage = msg;
    this.successMessage = '';
  }
}