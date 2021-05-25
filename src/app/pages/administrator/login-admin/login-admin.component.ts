import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  switchView(action) {
    const login: any = document.getElementById('l-login')
    const register: any = document.getElementById('l-register')
    const forget: any = document.getElementById('l-forget-password')
    switch (action) {
      case "register":
        login.classList.remove("toggled")
        forget.classList.remove("toggled")
        register.classList.add("toggled")
        break;
      case "forget":
        login.classList.remove("toggled")
        forget.classList.add("toggled")
        register.classList.remove("toggled")
        break;
      case "login":
        login.classList.add("toggled")
        forget.classList.remove("toggled")
        register.classList.remove("toggled")
        break;
    }
  }
}
