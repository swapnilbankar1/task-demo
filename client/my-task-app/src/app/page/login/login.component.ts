import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName = '';
  password = '';
  isEnableRegisterUser: boolean = false;

  login() {

  }

  enableRegisterUser() {
    this.isEnableRegisterUser = !this.isEnableRegisterUser;
  }

  registerUser() {

  }

  clear() {

  }
}
