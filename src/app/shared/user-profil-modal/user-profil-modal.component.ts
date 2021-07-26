import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { UsersService } from 'src/app/core/service/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profil-modal',
  templateUrl: './user-profil-modal.component.html',
  styleUrls: ['./user-profil-modal.component.scss'],
})
export class UserProfilModalComponent implements OnInit, AfterViewInit {
  registerBody;

  editMode = false;
  error = undefined;
  loading = false;

  constructor(
    private service: UsersService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) {}

  ngOnInit(): void {
    this.editMode = false;
    this.registerBody = this.authService.getLoggedUserInfo();
  }

  ngAfterViewInit(): void {
    // const qrDiv: any = document.getElementById('qrCodeProfile');
    // if (qrDiv) {
    //   qrDiv.innerHTML = this.registerBody.qrCode;
    // }
  }

  updateInfo(): void {
    this.editMode = false;
    this.loading = true;
    const closeBtns: any = document.getElementsByClassName('close-modal');

    this.service.update(this.registerBody).subscribe(
      (res) => {
        if (res) {
          this.loading = false;
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Account successfully updated',
            showConfirmButton: false,
            timer: 1500,
          });

          this.editMode = false;
          this.authService.storeLoggedUserInfo({ user: res.user })
          const qrDiv: any = document.getElementById('qrCodeProfile');
          if (qrDiv) {
            qrDiv.innerHTML = res.qrCode;
          }
        }
        Array.from(closeBtns).forEach((e: any) => {
          e.click();
        });
      },
      (err) => {
        this.loading = false;
        this.error = this.errorMessageHandler.getSingleErrorMessage(err);
      }
    );
  }
}
