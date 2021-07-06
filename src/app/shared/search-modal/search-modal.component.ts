import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/core/service/games.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {

  search = ''

  constructor(
    public router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    const closeBtns: any = document.getElementsByClassName('close-modal');
    Array.from(closeBtns).forEach((e: any) => {
      e.click();
    });
    // this.router.navigateByUrl('/fixtures?search=' + this.search)
    this.router.navigate(['/fixtures'], { queryParams: { search: this.search } })
  }

}
