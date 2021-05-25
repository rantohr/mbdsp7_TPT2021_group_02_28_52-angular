import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcomb-area',
  templateUrl: './breadcomb-area.component.html',
  styleUrls: ['./breadcomb-area.component.scss']
})
export class BreadcombAreaComponent implements OnInit {

  @Input() title: any
  @Input() description: any
  
  constructor() { }

  ngOnInit(): void {
  }

}
