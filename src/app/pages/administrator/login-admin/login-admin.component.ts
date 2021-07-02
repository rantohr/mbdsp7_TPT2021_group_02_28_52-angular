import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
  loginBody = {
    email: undefined,
    password: undefined,
  };

  error = undefined;
  loading = false;

  constructor(
    private service: AuthService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler,
    public router: Router
  ) {}

  ngOnInit(): void {}

  switchView(action) {
    const login: any = document.getElementById('l-login');
    const register: any = document.getElementById('l-register');
    const forget: any = document.getElementById('l-forget-password');
    switch (action) {
      case 'register':
        login.classList.remove('toggled');
        forget.classList.remove('toggled');
        register.classList.add('toggled');
        break;
      case 'forget':
        login.classList.remove('toggled');
        forget.classList.add('toggled');
        register.classList.remove('toggled');
        break;
      case 'login':
        login.classList.add('toggled');
        forget.classList.remove('toggled');
        register.classList.remove('toggled');
        break;
    }
  }

  login(): void {
    this.loading = true;
    this.error = undefined
    this.service.login(this.loginBody).subscribe(
      (res) => {
        if (res) {
          this.loading = false;
          this.service.clearTokens();
          this.service.storeTokens(res.accessToken, res.refreshToken);
          this.service.storeLoggedUserInfo(res)
          this.snackBar.openFromComponent(NotificationComponent, {
            duration: 4000,
            data: {
              message: 'Logged successfully',
              type: 'success',
            },
            panelClass: ['success-snackbar'],
          });
          
          this.router.navigate(['administrator/home']);
        }
      },
      (err) => {
        this.loading = false;
        this.error = this.errorMessageHandler.getSingleErrorMessage(err);
      }
    );
  }
}
