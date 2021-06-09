import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-modal',
  templateUrl: './forget-modal.component.html',
  styleUrls: ['./forget-modal.component.scss']
})
export class ForgetModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  switchInterface(type): void {
    const closeBtns: any = document.getElementsByClassName('close-modal')
    const loginBtn = document.getElementById('loginBtn')
    const registerBtn = document.getElementById('registerBtn')
    const forgetBtn = document.getElementById('forgetBtn')
    const resetBtn = document.getElementById('resetBtn')
    Array.from(closeBtns).forEach((e: any) => {
      e.click()
    });
    switch (type) {
      case 'signup':
        registerBtn.click()
        break;
      case 'login':
        loginBtn.click()
        break;
      case 'forget':
        forgetBtn.click()
        break;
      case 'reset':
        resetBtn.click()
        break;
    }
  }
}
