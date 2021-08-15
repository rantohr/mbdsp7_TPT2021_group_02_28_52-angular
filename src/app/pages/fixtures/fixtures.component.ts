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
  isExpanded = false;
  state = 'collapsed';
  filterForm = {
    search: '',
    city: '',
    minOdds: 0,
    maxOdds: 100,
    d1: '',
    d2: '2022-01-01',
  }
  filterMode = false

  constructor(private route: ActivatedRoute, private router: Router, private service: GamesService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(p => {
      this.search = p.search ? p.search : ""
      this.loading = true
      this.service.getWithFilter({ upcoming: true, start: this.page * 10, search: this.search }).pipe(
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
    });

    this.loading = true
    this.service.getWithFilter({ upcoming: true, start: this.page * 10, search: this.search }).pipe(
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

  paginate(type) {
    this.loading = true
    if (type == -1 && this.page > 0) {
      this.page = this.page - 1
    } else if (type == 1 && this.games.length) {
      this.page = this.page + 1
    }

    if (this.filterMode) {
      this.service.getWithFilter({ upcoming: true, ...this.filterForm, page: this.page }).pipe(
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
    } else {
      this.service.getWithFilter({ upcoming: true, start: this.page * 10, search: this.search }).pipe(
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
  }

  selectMatch(id: any): any {
    this.selectedMatch = this.games.find(e => e.ID == id)
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  filter() {
    this.filterMode = true
    this.page = 0
    this.service.getWithFilter({ ...this.filterForm, upcoming: true, page: this.page }).pipe(
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
