import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  constructor(private router: Router) {}
  register() {
    this.router.navigate(['/login']);
  }
}
