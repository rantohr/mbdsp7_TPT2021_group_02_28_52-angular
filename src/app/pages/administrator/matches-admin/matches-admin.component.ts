import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
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
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.service.getWithFilter({ limit: 20000 }).pipe(
      tap(x => {
        x.forEach(e => {
          const date = new Date(e.DATE_MATCH.data[1], e.DATE_MATCH.data[2], e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
          e.DATE_MATCH = date;
        });
      }),
    ).subscribe((games) => {
      if (games) {
        this.games = games;
        this.loading = false
      }
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
        this.service.delete(games.ID).subscribe(
          (res) => {
            if (res == null) {
              this.loading = false;
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'games deleted successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              this.service.getWithFilter({ limit: 20000 }).pipe(
                tap(x => {
                  x.forEach(e => {
                    const date = new Date(e.DATE_MATCH.data[1], e.DATE_MATCH.data[2], e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
                    e.DATE_MATCH = date;
                  });
                }),
              ).subscribe((games) => {
                if (games) this.games = games;
              });
            }
          },
          (err) => {
            this.loading = false;
            Swal.fire({
              position: 'bottom',
              icon: 'error',
              title: 'You cannot delete this match because some people already bet on it',
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
              this.service.getWithFilter({ limit: 20000 }).pipe(
                tap(x => {
                  x.forEach(e => {
                    const date = new Date(e.DATE_MATCH.data[1], e.DATE_MATCH.data[2], e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
                    e.DATE_MATCH = date;
                  });
                }),
              ).subscribe((games) => {
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
              this.service.getWithFilter({ limit: 20000 }).pipe(
                tap(x => {
                  x.forEach(e => {
                    const date = new Date(e.DATE_MATCH.data[1], e.DATE_MATCH.data[2], e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
                    e.DATE_MATCH = date;
                  });
                }),
              ).subscribe((games) => {
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
