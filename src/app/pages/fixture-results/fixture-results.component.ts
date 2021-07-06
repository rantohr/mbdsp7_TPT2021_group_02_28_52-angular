import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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
    this.loading = true
    this.service.getWithFilter({ start: this.page * 10, result: true }).pipe(
      tap(x => {
        x.forEach(e => {
          const date = new Date(e.DATE_MATCH.data[1], e.DATE_MATCH.data[2], e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
          e.DATE_MATCH = date;
        });
      }),
    ).subscribe((games) => {
      if (games) {
        this.games = games;
        this.loading = false
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
    this.service.getWithFilter({ start: this.page * 10 }).pipe(
      tap(x => {
        x.forEach(e => {
          const date = new Date(e.DATE_MATCH.data[1], e.DATE_MATCH.data[2], e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
          e.DATE_MATCH = date;
        });
      }),
    ).subscribe((games) => {
      if (games) {
        this.loading = false
        this.games = games;
      }
    });
  }

}
