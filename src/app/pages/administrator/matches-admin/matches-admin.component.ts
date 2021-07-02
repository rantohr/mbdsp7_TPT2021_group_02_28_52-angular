import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { GamesService } from 'src/app/core/service/games.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matches-admin',
  templateUrl: './matches-admin.component.html',
  styleUrls: ['./matches-admin.component.scss']
})
export class MatchesAdminComponent implements OnInit {

  formView = false;
  games = [];
  selectedItem: any;
  loading = false;
  p: number = 1;

  constructor(
    private service: GamesService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) {}

  ngOnInit(): void {
    this.service.getWithFilter({limit: 20000}).subscribe((games) => {
      if (games) this.games = games;
    });
  }

  warningDialog(games: any): any {
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
        this.service.delete(games.id).subscribe(
          (res) => {
          console.log("🚀 ~ file: matches-admin.component.ts ~ line 44 ~ MatchesAdminComponent ~ warningDialog ~ res", res)
            if (res == null) {
              this.loading = false;
              console.log("🚀 ~ file: matches-admin.component.ts ~ line 46 ~ MatchesAdminComponent ~ warningDialog ~ this.loading", this.loading)
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'games deleted successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              this.service.get().subscribe((games) => {
                if (games) this.games = games;
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
        Swal.fire('Cancelled', 'This games is safe :)', 'error');
      }
    });
  }

  selectItem(games): any {
    this.selectedItem = games;
    this.formView = !this.formView;
  }

  receiveFormEvent(event: any): any {
    if (event == -1) {
      this.formView = !this.formView;
    } else {
      this.loading = true;
      !event.id
        ? this.service.create(event).subscribe(
            (res) => {
              if (res) {
                this.loading = false;
                Swal.fire({
                  position: 'bottom',
                  icon: 'success',
                  title: 'games added successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.formView = !this.formView;
                this.service.get().subscribe((games) => {
                  if (games) this.games = games;
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
                  title: 'games updated successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.formView = !this.formView;
                this.service.get().subscribe((games) => {
                  if (games) this.games = games;
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
