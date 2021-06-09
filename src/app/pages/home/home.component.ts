import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/core/service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  news = [];

  constructor(private router: Router, private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.get().subscribe((res) => {
      if (res) {
        this.news = res
      }
    });
  }

  toDetails(): void {
    this.router.navigate(['/details']);
  }
}
