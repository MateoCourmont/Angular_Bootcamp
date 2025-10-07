import { Component } from '@angular/core';
import { AppRoutingModule } from "../../app.routes";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './header-component.html',
})
export class HeaderComponent {

}
