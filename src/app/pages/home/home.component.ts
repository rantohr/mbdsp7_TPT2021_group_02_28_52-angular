import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedMatch = undefined
  loggedUser = undefined

  constructor(private router: Router, private authService: AuthService, private newsService: NewsService, private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUserInfo()
    this.newsService.get().subscribe((res) => {
      if (res) {
        this.news = res
      }
    });

    this.gamesService.getWithFilter({upcoming: true}).subscribe((res) => {
      if (res) {
        this.upcoming = res.slice(0,5)
        console.log("🚀 ~ file: home.component.ts ~ line 28 ~ HomeComponent ~ this.gamesService.getWithFilter ~ this.upcoming", this.upcoming)
      }
    });

    this.gamesService.getTop().subscribe((res) => {
      if (res) {
        this.teamsRanking = res.slice(0,10).sort((a,b) => b.WINS - a.WINS)
        console.log("🚀 ~ file: home.component.ts ~ line 34 ~ HomeComponent ~ this.gamesService.getTop ~ this.teamsRanking", this.teamsRanking)
      }
    });
  }

  toDetails(): void {
    this.router.navigate(['/details']);
  }

  selectMatch(id: any): any {
    this.selectedMatch = this.upcoming.find(e => e.ID == id)
  }
}
