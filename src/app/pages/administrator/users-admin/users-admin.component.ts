import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { UsersService } from 'src/app/core/service/users.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
})
export class UsersAdminComponent implements OnInit {
  formView = false;
  users = [];
  selectedItem: any;
  loading = false
  p: number = 1;

  constructor(
    private service: UsersService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.service.get().subscribe((users) => {
      if (users) {
        this.users = users;
        this.loading = false
      }
    });
  }

  warningDialog(users: any): any {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.service.delete(users._id).subscribe(
          (res) => {
            if (res) {
              this.loading = false;
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'User deleted successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              this.service.get().subscribe((users) => {
                if (users) this.users = users;
              });
            }
          },
          (err) => {
            this.loading = false;
            Swal.fire({
              position: 'bottom',
              icon: 'error',
              title: this.errorMessageHandler.getSingleErrorMessage(err),
              showConfirmButton: false,
              timer: 3000,
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'This users is safe :)', 'error');
      }
    });
  }

  selectItem(users): any {
    this.selectedItem = users;
    this.formView = !this.formView;
  }

  receiveFormEvent(event: any): any {
    if (event == -1) {
      this.formView = !this.formView;
    } else {
      this.loading = true;
      !event._id
        ? this.service.create(event).subscribe(
          (res) => {
            if (res) {
              this.loading = false;
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'User added successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              this.formView = !this.formView;
              this.service.get().subscribe((users) => {
                if (users) this.users = users;
              });
            }
          },
          (err) => {
            this.loading = false;
            Swal.fire({
              position: 'bottom',
              icon: 'error',
              title: this.errorMessageHandler.getSingleErrorMessage(err),
              showConfirmButton: false,
              timer: 3000,
            });
          }
        )
        : this.service.update(event).subscribe(
          (res) => {
            if (res) {
              this.loading = false;
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'User updated successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              this.formView = !this.formView;
              this.service.get().subscribe((users) => {
                if (users) this.users = users;
              });
            }
          },
          (err) => {
            this.loading = false;
            Swal.fire({
              position: 'bottom',
              icon: 'error',
              title: this.errorMessageHandler.getSingleErrorMessage(err),
              showConfirmButton: false,
              timer: 3000,
            });
          }
        );
    }
    this.selectedItem = undefined;
  }
}
