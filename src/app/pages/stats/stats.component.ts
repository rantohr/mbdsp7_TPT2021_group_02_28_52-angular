import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  profit = undefined
  bets = undefined
  gamesPerM = []
  gamblerByAge = undefined
  loss = []
  wins = []

  loading = false

  constructor(private service: GamesService, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getLoggedUserInfo()
    this.service.count({ table: 'bets', userID: user._id }).subscribe(res => {
      if (res) this.bets = { title: 'Your Bets', value: res[0].COUNT }
    })
    this.service.gamesPerMonth().subscribe(res => {
      if (res && res.length) {
        const arr = res[0]
        this.gamesPerM = [arr.JAN, arr.FEB, arr.MARCH, arr.APRIL, arr.MAY, arr.JNE, arr.JUL, arr.AUG, arr.SEPT, arr.OCT, arr.NOV, arr.DEC]
        this.loading = false
      }
    })
    this.service.gamblersByAge().subscribe(res => {
      if (res) {
        this.gamblerByAge = res
      }
    })

    this.service.getHistory({ userID: user._id }).subscribe((res) => {
      if (res) {
        this.loss = res.filter(e => e.TOTAL < 0)
        this.wins = res.filter(e => e.TOTAL > 0)
        this.profit = { title: 'Your Profit', value: this.wins[0].TOTAL?.toFixed(2) }
      }
    });
  }

}
