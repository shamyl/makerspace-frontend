import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'makerspace';
  visible = false;

  constructor(private router: Router) {}

  // Method to check if the current route is the login page
  isLoginPage(): boolean {
    return this.router.url === '/login';  // Adjust if the login route is different
  }
  isSignupPage(): boolean {
    return this.router.url === '/signup';  // Adjust if the login route is different
  }
}
