import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigsService } from 'src/app/core/service/configs.service';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-bets-admin',
  templateUrl: './bets-admin.component.html',
  styleUrls: ['./bets-admin.component.scss'],
})
export class BetsAdminComponent implements OnInit {
  config: any;

  constructor(
    private service: ConfigsService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) {}

  ngOnInit(): void {
    this.service.get().subscribe((conf) => {
      if (conf && conf.length) this.config = conf[0];
    });
  }

  submit(): void {
    this.service.update(this.config).subscribe(
      (res) => {
        if (res) {
          this.snackBar.openFromComponent(NotificationComponent, {
            duration: 4000,
            data: {
              message: 'Logged successfully',
              type: 'success',
            },
            panelClass: ['success-snackbar'],
          });
          this.service.get().subscribe((conf) => {
            if (conf && conf.length) this.config = conf[0];
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
}
