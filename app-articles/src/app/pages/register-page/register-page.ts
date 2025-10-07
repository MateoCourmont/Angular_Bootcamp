import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  imports: [ RouterLink, RouterModule, FormsModule, CommonModule ],
})
export class RegisterPage {
  user = {
    email: '',
    password: '',
    passwordConfirm: '',
    pseudo: '',
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
  if (!this.user.email || !this.user.password || !this.user.pseudo || !this.user.passwordConfirm) {
    return this.showErrorMessage('Tous les champs sont obligatoires.');
  }

  if (this.user.password !== this.user.passwordConfirm) {
    return this.showErrorMessage('Les mots de passe ne correspondent pas.');
  }

  this.authService.signup(this.user).subscribe({
    next: (res) => {
      if (res.code === '200') {
        this.showSuccessMessage('Inscription réussie !');
        setTimeout(() => this.router.navigate(['/login']), 1000);
      } else {
        this.showErrorMessage(res.message || 'Erreur lors de l’inscription.');
      }
    },
    error: (err) => this.showErrorMessage('Erreur serveur ou email déjà utilisé.')
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