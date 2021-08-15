import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { GamesService } from 'src/app/core/service/games.service';
import { NewsService } from 'src/app/core/service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  news = []
  upcoming = []
  teamsRanking = []
  results = []
  selectedMatch = undefined
  loggedUser = undefined
  notifs = []

  constructor(private router: Router, private authService: AuthService, private newsService: NewsService, private gamesService: GamesService) {}

  loadingMain = true
  loadingUpc = true
  loadingRank = true
  loadingRes = true
  
  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUserInfo()
    this.newsService.get().subscribe((res) => {
      if (res) {
        this.news = res
        this.loadingMain = false
      }
    });

    this.gamesService.getWithFilter({upcoming: true}).subscribe((res) => {
      if (res) {
        this.upcoming = res.slice(0,5)
        this.loadingUpc = false
      }
    });

    this.gamesService.getTop().subscribe((res) => {
      if (res) {
        this.teamsRanking = res.slice(0,10).sort((a,b) => b.WINS - a.WINS)
        this.loadingRank = false
      }
    });

    this.gamesService.getWithFilter({ start: 0, limit: 5, result: true }).pipe(
      tap(x => {
        x.forEach(e => {
          const date = new Date(e.DATE_MATCH.data[1]+1900, e.DATE_MATCH.data[2]-1, e.DATE_MATCH.data[3], e.DATE_MATCH.data[4])
          e.DATE_MATCH = date;
        });
      }),
    ).subscribe((games) => {
      if (games) {
        this.results = games;
        this.loadingRes = false
      }
    });
  }

  selectMatch(id: any): any {
    this.selectedMatch = this.upcoming.find(e => e.ID == id)
  }
}
