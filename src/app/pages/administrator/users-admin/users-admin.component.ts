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

  constructor(
    private service: UsersService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) {}

  ngOnInit(): void {
    this.service.get().subscribe((users) => {
      if (users) this.users = users;
    });
  }

  warningDialog(user: any): any {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(user._id).subscribe(
          (res) => {
            if (res) {
              Swal.fire(
                'Deleted!',
                'This user has been deleted.',
                'success'
              );
              this.service.get().subscribe((users) => {
                if (users) this.users = users;
              });
            }
          },
          (err) => {
            this.snackBar.openFromComponent(NotificationComponent, {
              duration: 4000,
              data: {
                message: this.errorMessageHandler.getSingleErrorMessage(err),
                type: 'error',
              },
              panelClass: ['error-snackbar'],
            });
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'This user is safe :)', 'error');
      }
    });
  }

  selectItem(user): any {
    this.selectedItem = user;
    this.formView = !this.formView;
  }

  receiveFormEvent(event: any): any {
    if (event == -1) {
      this.formView = !this.formView;
      this.selectedItem = undefined;
    } else {
      !event._id
        ? this.service.create(event).subscribe(
            (res) => {
              if (res) {
                this.snackBar.openFromComponent(NotificationComponent, {
                  duration: 4000,
                  data: {
                    message: 'User added successfully',
                    type: 'success',
                  },
                  panelClass: ['success-snackbar'],
                });
                this.formView = !this.formView;
                this.service.get().subscribe((users) => {
                  if (users) this.users = users;
                });
              }
            },
            (err) => {
              this.snackBar.openFromComponent(NotificationComponent, {
                duration: 4000,
                data: {
                  message: this.errorMessageHandler.getSingleErrorMessage(err),
                  type: 'error',
                },
                panelClass: ['error-snackbar'],
              });
            }
          )
        : this.service.update(event).subscribe(
            (res) => {
              if (res) {
                this.snackBar.openFromComponent(NotificationComponent, {
                  duration: 4000,
                  data: {
                    message: 'User updated successfully',
                    type: 'success',
                  },
                  panelClass: ['success-snackbar'],
                });
                this.formView = !this.formView;
                this.service.get().subscribe((users) => {
                  if (users) this.users = users;
                });
              }
            },
            (err) => {
              this.snackBar.openFromComponent(NotificationComponent, {
                duration: 4000,
                data: {
                  message: this.errorMessageHandler.getSingleErrorMessage(err),
                  type: 'error',
                },
                panelClass: ['error-snackbar'],
              });
            }
          );
    }
    this.selectedItem = undefined;
  }
}
