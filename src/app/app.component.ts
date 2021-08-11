import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/service/auth/auth.service';
import { UsersService } from './core/service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private userService: UsersService) { }

  loading = false

  ngOnInit(): void {
    // this.authService.clearTokens()
    const loggedUser = this.authService.getLoggedUserInfo()
    if (loggedUser && loggedUser._id) {
      this.userService.get({ _id: loggedUser._id }).subscribe((res) => {
        if (res && res[0]) {
          this.authService.storeLoggedUserInfo({user: res[0]})
        }
      });
    }
  }
}
