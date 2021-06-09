import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.role;
    const token = localStorage.getItem('access-token');
    let tokenPayload: any;
    if (token) tokenPayload = decode(token);
    if (
      !this.auth.isAuthenticated() ||
      !expectedRole.includes(tokenPayload.role)
    ) {
      if (expectedRole.includes('admin'))
        this.router.navigate(['administrator/login']);
      else {
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.click();
      }
      return false;
    }
    return true;
  }
}
