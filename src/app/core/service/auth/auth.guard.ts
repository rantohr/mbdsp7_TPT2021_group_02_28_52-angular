import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
} from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      const loginBtn = document.getElementById('loginBtn')
      if(loginBtn) loginBtn.click()
      return false
    }
    return true
  }

  isActive(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/'])
      return true
    }
    return false
  }

}
