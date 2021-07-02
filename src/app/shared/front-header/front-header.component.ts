import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  navigationSubscription: any; 
  loggedUser: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUserInfo()
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

  signout(): void {
    this.authService.clearTokens()
    this.router.navigate(['/home']);
  }
}
