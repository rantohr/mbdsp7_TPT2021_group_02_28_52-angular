import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { BetsService } from 'src/app/core/service/bets.service';
import { ConfigsService } from 'src/app/core/service/configs.service';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bets-admin',
  templateUrl: './bets-admin.component.html',
  styleUrls: ['./bets-admin.component.scss'],
})
export class BetsAdminComponent implements OnInit {
  config: any;
  loading = false;
  bets = []
  p: number = 1;

  constructor(
    private service: ConfigsService,
    private betsService: BetsService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.service.get().subscribe((conf) => {
      if (conf && conf.length) this.config = conf[0];
    });
    this.betsService.getJava().subscribe((bets) => {
      if (bets) {
        this.bets = bets;
        this.loading = false
      }
    });
  }

  submit(): void {
    this.loading = true;
    this.service.update(this.config).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Configs updated successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.service.get().subscribe((conf) => {
            if (conf && conf.length) this.config = conf[0];
          });
          this.loading = false;
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
}
