import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-fixture-results',
  templateUrl: './fixture-results.component.html',
  styleUrls: ['./fixture-results.component.scss']
})
export class FixtureResultsComponent implements OnInit {

  loading = false
  games = []
  page = 1
  constructor(private router: Router, private service: GamesService) { }

  ngOnInit(): void {
    this.service.getWithFilter({ start: this.page*10, result: true }).subscribe((games) => {
      if (games) {
        this.games = games;
        console.log("🚀 ~ file: fixture-results.component.ts ~ line 21 ~ FixtureResultsComponent ~ this.service.getWithFilter ~ this.games", this.games)
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
    this.service.getWithFilter({ start: this.page*10 }).subscribe((games) => {
      if (games) {
        this.loading = false
        this.games = games;
      }
    });
  }

}
