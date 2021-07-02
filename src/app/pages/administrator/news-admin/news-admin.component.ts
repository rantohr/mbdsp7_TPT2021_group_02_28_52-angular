import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';
import { NewsService } from 'src/app/core/service/news.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.scss'],
})
export class NewsAdminComponent implements OnInit {
  formView = false;
  news = [];
  selectedItem: any;
  loading = false;
  p: number = 1;

  constructor(
    private service: NewsService,
    private snackBar: MatSnackBar,
    private errorMessageHandler: ErrorMessageHandler
  ) {}

  ngOnInit(): void {
    this.service.get().subscribe((news) => {
      if (news) this.news = news;
    });
  }

  warningDialog(news: any): any {
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
        this.service.delete(news._id).subscribe(
          (res) => {
            if (res) {
              this.loading = false;
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'News deleted successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              this.service.get().subscribe((news) => {
                if (news) this.news = news;
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
        Swal.fire('Cancelled', 'This news is safe :)', 'error');
      }
    });
  }

  selectItem(news): any {
    this.selectedItem = news;
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
                  title: 'News added successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.formView = !this.formView;
                this.service.get().subscribe((news) => {
                  if (news) this.news = news;
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
                  title: 'News updated successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.formView = !this.formView;
                this.service.get().subscribe((news) => {
                  if (news) this.news = news;
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
