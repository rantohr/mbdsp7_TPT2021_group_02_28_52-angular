import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  signout(): void {
    this.authService.clearTokens()
    this.router.navigate(['administrator/login']);
  }
}
