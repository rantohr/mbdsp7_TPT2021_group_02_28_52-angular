import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  navigationSubscription: any; 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toFixtures(): void {
    this.router.navigate(['/fixtures']);
  }

  toHome(): void {
    this.router.navigate(['/home']);
  }

  toResults(): void {
    this.router.navigate(['/results']);
  }

  toHistory(): void {
    this.router.navigate(['/history']);
  }

}
