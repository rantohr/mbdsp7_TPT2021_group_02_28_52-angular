import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit {

  history = []

  constructor(private router: Router, private authService: AuthService, private gamesService: GamesService) {}

  ngOnInit(): void {
    const user = this.authService.getLoggedUserInfo();
    this.gamesService.getHistory({userID: user._id}).subscribe((res) => {
      if (res) {
        this.history = res
        console.log("🚀 ~ file: bet-history.component.ts ~ line 22 ~ BetHistoryComponent ~ this.gamesService.getHistory ~ this.history", this.history)
      }
    });
  }

}
