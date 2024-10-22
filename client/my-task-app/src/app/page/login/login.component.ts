import { Component } from '@angular/core';
import { AuthService } from '../../../app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName = '';
  password = '';
  isEnableRegisterUser: boolean = false;

  constructor(private authService: AuthService) {

  }

  login() {

  }

  enableRegisterUser() {
    this.isEnableRegisterUser = !this.isEnableRegisterUser;
  }

  registerUser() {
    this.authService.register(this.userName, this.password).subscribe(resp => {

    }, error => {

    })
  }

  clear() {

  }
}
