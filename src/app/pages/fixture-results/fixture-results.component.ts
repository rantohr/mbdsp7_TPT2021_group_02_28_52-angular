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
  page = 0
  filterForm = {
    search: '',
    d1: '2020-01-01',
    d2: '2022-01-01',
  }
  filterMode = false

  constructor(private router: Router, private service: GamesService) { }

  ngOnInit(): void {
    this.loading = true
    this.service.getWithFilter({ start: this.page * 10, result: true }).pipe(
      tap(x => {
        x.forEach(e => {
          const date = new Date(e.DATE_MATCH.data[1]+1900, e.DATE_MATCH.data[2]-1, e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
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
    if (type == -1 && this.page > 0) {
      this.page = this.page - 1
    } else if (type == 1 && this.games.length) {
      this.page = this.page + 1
    }
    this.service.getWithFilter({ ...this.filterForm, start: this.page * 10, result: true }).pipe(
      tap(x => {
        x.forEach(e => {
          const date = new Date(e.DATE_MATCH.data[1]+1900, e.DATE_MATCH.data[2]-1, e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
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

  filter() {
    this.filterMode = true
    this.page = 0
    this.service.getWithFilter({ ...this.filterForm, page: this.page, result: true }).pipe(
      tap(x => {
        x.forEach(e => {
          const date = new Date(e.DATE_MATCH.data[1]+1900, e.DATE_MATCH.data[2]-1, e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
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
}
