import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { BetsService } from 'src/app/core/service/bets.service';

@Component({
  selector: 'app-bet-modal',
  templateUrl: './bet-modal.component.html',
  styleUrls: ['./bet-modal.component.scss']
})
export class BetModalComponent implements OnInit, AfterViewChecked {

  @Input() match: any
  form = {
    id: null,
    id_gambler: null,
    id_game: null,
    bet: null,
    id_team: null,
    odds: 0,
    username: null,
    email: null,
    oldBet: 0
  }
  error = undefined
  loading: boolean;
  user = undefined
  updateMode = false
  old = undefined

  constructor(private router: Router, private authService: AuthService, private betService: BetsService) { }

  ngOnInit(): void {

  }

  ngAfterViewChecked() {
    this.user = this.authService.getLoggedUserInfo()
    if (this.match) {
      this.form.id_game = this.match.ID
      if (this.old != this.match.ID) {
        this.betService.betExist({ userID: this.user._id, gameID: this.match.ID }).subscribe(r => {

          console.log('r', r);

          if (r && r.length && r[0].ID) {
            this.form.id = r[0].ID
            this.updateMode = true
            this.form.id_game = r[0].ID_GAME
            this.form.id_team = r[0].ID_TEAM
            this.form.bet = r[0].BET
            this.form.oldBet = r[0].BET
            this.old = this.match.ID
          }
        }, (err) => {
          this.error = err
          this.loading = false
        })
      }
    }
  }

  submit(): void {
    this.loading = true
    this.error = undefined
    if (this.form.bet <= 0 && this.user.tokens < this.form.bet) this.error = 'invalid bet'
    this.form.odds = this.match.ODDS_DRAW
    if (this.form.id_team == this.match.ID1) this.form.odds = this.match.ODDS_HOME
    else if (this.form.id_team == this.match.ID2) this.form.odds = this.match.ODDS_AWAY
    this.form.id_gambler = this.user._id
    this.form.username = this.user.username
    this.form.email = this.user.email
    this.form.id_game = this.match.ID

    if (this.updateMode) {
      this.betService.update(this.form).subscribe(r => {
        if (r) {
          this.user.tokens = this.user.tokens + this.form.oldBet - this.form.bet
          this.authService.storeLoggedUserInfo({ user: this.user })
          this.loading = false
          this.error = 'Bet successfully recorded'

          this.router.navigate(['/home']);
        }
      }, (err) => {
        this.error = err
        this.loading = false
      })
    } else {
      this.betService.create(this.form).subscribe(r => {
        if (r) {
          this.user.tokens = this.user.tokens - this.form.bet
          this.authService.storeLoggedUserInfo({ user: this.user })
          this.loading = false
          this.error = 'Bet successfully recorded'

          this.router.navigate(['/home']);
        }
      }, (err) => {
        this.error = err
        this.loading = false
      })
    }
  }

}
