import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {

  loading = false
  games = []
  page = 1
  selectedMatch = undefined

  constructor(private router: Router, private service: GamesService) { }

  ngOnInit(): void {
    this.service.getWithFilter({ upcoming: true, start: this.page*10 }).subscribe((games) => {
      if (games) {
        this.games = games;
      }
    });
  }

  toDetails(): void {
    this.router.navigate(['/details']);
  }

  paginate(type) {
    this.loading = true
    if (type == -1 && this.page >= 1) {
      this.page = this.page - 1
    } else {
      this.page = this.page + 1
    }
    this.service.getWithFilter({ upcoming: true, start: this.page*10 }).subscribe((games) => {
      if (games) {
        this.loading = false
        this.games = games;
      }
    });
  }

  selectMatch(id: any): any {
    this.selectedMatch = this.games.find(e => e.ID == id)
  }
}
