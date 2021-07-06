import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {

  loading = false
  games = []
  page = 0
  selectedMatch = undefined
  search: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private service: GamesService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(p => {
      this.search = p.search ? p.search : ""
      this.loading = true
      this.service.getWithFilter({ upcoming: true, start: this.page * 10, search: this.search }).pipe(
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
    });

    this.loading = true
    this.service.getWithFilter({ upcoming: true, start: this.page * 10, search: this.search }).pipe(
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
    this.service.getWithFilter({ upcoming: true, start: this.page * 10, search: this.search }).pipe(
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

  selectMatch(id: any): any {
    this.selectedMatch = this.games.find(e => e.ID == id)
  }
}
