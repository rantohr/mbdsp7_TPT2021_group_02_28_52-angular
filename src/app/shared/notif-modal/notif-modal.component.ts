import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notif-modal',
  templateUrl: './notif-modal.component.html',
  styleUrls: ['./notif-modal.component.scss']
})
export class NotifModalComponent implements OnInit {

  @Input() data: any
  
  constructor() { }

  ngOnInit(): void {
  }

}
