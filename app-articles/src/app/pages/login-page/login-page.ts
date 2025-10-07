import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      return this.showErrorMessage('Tous les champs sont obligatoires.');
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.code === '200') {
          this.showSuccessMessage('Connexion réussie !');
          setTimeout(() => this.router.navigate(['/articles']), 1000);
        } else {
          this.showErrorMessage(res.message || 'Erreur lors de la connexion.');
        }
      },
      error: (err) => this.showErrorMessage('Erreur serveur ou email/mot de passe incorrect.')
    });
  }

  private showSuccessMessage(msg: string) {
    this.successMessage = msg;
    this.errorMessage = '';
  }

  private showErrorMessage(msg: string) {
    this.errorMessage = msg;
    this.successMessage = '';
  }
}