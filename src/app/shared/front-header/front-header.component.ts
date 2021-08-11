import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { UsersService } from 'src/app/core/service/users.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  navigationSubscription: any; 
  loggedUser: any;

  constructor(private router: Router, private authService: AuthService, private userService: UsersService) { }

  ngOnInit(): void {
    const loggedUser = this.authService.getLoggedUserInfo()
    this.loggedUser = this.authService.getLoggedUserInfo()
    if (loggedUser && loggedUser._id) {
      this.userService.get({ _id: loggedUser._id }).subscribe((res) => {
        if (res && res[0]) {
          this.authService.storeLoggedUserInfo({user: res[0]})
          this.loggedUser = this.authService.getLoggedUserInfo()
        }
      });
    }
  }

  toFixtures(): void {
    this.router.navigate(['/fixtures']);
  }

  toHome(): void {
    this.router.navigate(['/home']);
  }

  toResults(): void {
    this.router.navigate(['/results']);
  }

  toHistory(): void {
    this.router.navigate(['/history']);
  }

  toStats(): void {
    this.router.navigate(['/stats']);
  }

  signout(): void {
    this.authService.clearTokens()
    this.router.navigate(['/home']);
  }
}
