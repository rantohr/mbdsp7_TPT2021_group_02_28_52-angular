import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {

  registerBody = {
    email: undefined,
    password: undefined,
    confirm: undefined,
    role: undefined,
    name: undefined,
    qrCode: undefined,
    birthDate: undefined,
    gender: undefined,
    money: undefined,
    tokens: undefined,
    image: undefined,
    createdAt: undefined
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

  register(): void {
    const closeBtns: any = document.getElementsByClassName('close-modal');
    
    this.service.register(this.registerBody).subscribe(
      (res) => {
        if (res) {
          this.snackBar.openFromComponent(NotificationComponent, {
            duration: 4000,
            data: {
              message: 'Account successfully activated',
              type: 'success',
            },
            panelClass: ['success-snackbar'],
          });
        }
        Array.from(closeBtns).forEach((e: any) => {
          e.click();
        });
      },
      (err) => {
        this.error = this.errorMessageHandler.getSingleErrorMessage(err)
      }
    );
  }
}
