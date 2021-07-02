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

  constructor(private service: GamesService) { }

  ngOnInit(): void {
    this.service.count().subscribe(res => {
      if (res) this.countG = { title: 'Total Games', value: res[0].COUNT }
    })
    this.service.count({ table: 'bets' }).subscribe(res => {
      if (res) this.countB = { title: 'Total Bets', value: res[0].COUNT }
    })
    this.service.profitForWebsite().subscribe(res => {
      if (res) {
        this.profit = { title: 'Total Profit', value: res.profit+"$" }
        this.moneyInGame = { title: 'Money In Games', value: res.moneyInGame+"$" }
      }
    })
  }

}
