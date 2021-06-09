import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { NotificationComponent } from '../notification/notification.component';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  loginBody = {
    email: undefined,
    password: undefined,
  };

  error = undefined

  constructor(
    private service: AuthService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) {}

  ngOnInit(): void {}

  switchInterface(type): void {
    const closeBtns: any = document.getElementsByClassName('close-modal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const forgetBtn = document.getElementById('forgetBtn');
    const resetBtn = document.getElementById('resetBtn');
    Array.from(closeBtns).forEach((e: any) => {
      e.click();
    });
    switch (type) {
      case 'signup':
        registerBtn.click();
        break;
      case 'login':
        loginBtn.click();
        break;
      case 'forget':
        forgetBtn.click();
        break;
      case 'reset':
        resetBtn.click();
        break;
    }
  }

  login(): void {
    const closeBtns: any = document.getElementsByClassName('close-modal');
    this.service.login(this.loginBody).subscribe(
      (res) => {
        if (res) {
          this.service.clearTokens();
          this.service.storeTokens(res.accessToken, res.refreshToken);
          this.snackBar.openFromComponent(NotificationComponent, {
            duration: 4000,
            data: {
              message: 'Logged successfully',
              type: 'success'
            },
            panelClass: ['success-snackbar']
          });
          
          Array.from(closeBtns).forEach((e: any) => {
            e.click();
          });
        }
      },
      (err) => {
        this.error = this.errorMessageHandler.getSingleErrorMessage(err)
        // this.snackBar.openFromComponent(NotificationComponent, {
        //   duration: 4000,
        //   data: {
        //     message: this.errorMessageHandler.getSingleErrorMessage(err),
        //     type: 'error'
        //   },
        //   panelClass: ['error-snackbar']
        // });
      }
    );
  }
}
