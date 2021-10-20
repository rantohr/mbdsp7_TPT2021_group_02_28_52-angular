import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-charts-admin',
  templateUrl: './charts-admin.component.html',
  styleUrls: ['./charts-admin.component.scss']
})
export class ChartsAdminComponent implements OnInit {

  countG = undefined
  countB = undefined
  profit = undefined
  moneyInGame = undefined
  gamesPerM = []
  gamblerByAge = undefined
  gamblersByGender = undefined
  profitPerUser = undefined
  richestGamblers = undefined

  loading = false
  
  constructor(private service: GamesService) { }

  ngOnInit(): void {
    this.loading = true

    this.service.count().subscribe(res => {
      if (res) this.countG = { title: 'Total Games', value: res[0].COUNT }
    })
    this.service.count({ table: 'bets' }).subscribe(res => {
      if (res) this.countB = { title: 'Total Bets', value: res[0].COUNT }
    })
    this.service.profitForWebsite().subscribe(res => {
      if (res) {
        this.profit = { title: 'Total Profit', value: res.profit?.toFixed(2) + "$" }
        this.moneyInGame = { title: 'Money In Games', value: res.moneyInGame?.toFixed(2) + "$" }
      }
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
    this.service.gamblersByGender().subscribe(res => {
      if (res) {
        this.gamblersByGender = res
      }
    })

    this.service.richestGamblers().subscribe(res => {
      if (res) {
        this.richestGamblers = res.slice(0, 5)
      }
    })

    this.service.profitPerUser().subscribe(res => {
      if (res) {
        this.profitPerUser = res.sort((a, b) => b.TOTAL_MONEY - a.TOTAL_MONEY).slice(0, 5)
      }
    })
  }

}
