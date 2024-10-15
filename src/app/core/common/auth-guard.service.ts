import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Check if 'philipines_login' exists in localStorage
    const isLoggedIn = localStorage.getItem('user-info');

    if (isLoggedIn) {
      // If found, allow route activation
      return true;
    }

    // If not found, redirect to the login page
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url } // Optional: Save the return URL for redirect after login
    });

    return false;
  }
}
