import { Component } from '@angular/core';
import { RouterLink, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {

  constructor(private router: Router) {}
  login() {
    this.router.navigate(['/articles']);
  }
}
