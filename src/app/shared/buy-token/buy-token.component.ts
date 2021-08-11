import { Component, ErrorHandler, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { BetsService } from 'src/app/core/service/bets.service';
import { ErrorMessageHandler } from 'src/app/core/service/error-message-handler.service';

@Component({
  selector: 'app-buy-token',
  templateUrl: './buy-token.component.html',
  styleUrls: ['./buy-token.component.scss']
})
export class BuyTokenComponent implements OnInit {
  @Input() match: any
  form = {
    id_user: null,
    value: 0
  }
  error = undefined
  loading: boolean;
  user = undefined
  updateMode = false
  old = undefined

  constructor(private router: Router, private errorHandler: ErrorMessageHandler, private authService: AuthService, private betService: BetsService) { }

  ngOnInit(): void {
    this.user = this.authService.getLoggedUserInfo()
  }

  submit(): void {
    this.loading = true
    this.error = undefined
    if (this.form.value <= 0 || !this.user) {
      this.error = 'invalid value'
      this.loading = false
      return
    }
    this.form.id_user = this.user._id

    this.betService.buyToken(this.form).subscribe(r => {
      if (r) {
        this.user.tokens = this.user.tokens + this.form.value
        this.authService.storeLoggedUserInfo({ user: this.user })
        this.loading = false
        this.error = 'Transaction done'
        setInterval(() => {
          window.location.reload()
        }, 1000);
      }
    }, (err) => {
      this.error = 'invalid transaction'
      this.loading = false
    })
  }

}
