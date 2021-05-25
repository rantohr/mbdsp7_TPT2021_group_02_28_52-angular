import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toDetails(): void {
    this.router.navigate(['/details']);
  }

}
