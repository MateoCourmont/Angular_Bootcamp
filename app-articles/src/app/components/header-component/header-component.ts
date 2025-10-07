import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  faRightFromBracket = faRightFromBracket;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}