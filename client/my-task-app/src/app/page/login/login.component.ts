import { Component } from '@angular/core';
import { AuthService } from '../../../app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CookieService } from '../../services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  userName = '';
  password = '';
  isEnableRegisterUser: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService,
    private router: Router, private cookieService: CookieService) {

  }

  login() {
    this.authService.login(this.userName, this.password).subscribe((resp: any) => {
      console.log(resp);
      this.cookieService.setCookie('token', resp.token, 1);
      console.log(this.cookieService.getCookie('token'));
      console.log(this.authService.isLoggedIn());
      this.router.navigate(['/profile']);
    }, error => {
      this.toastr.error('Failed to login.');
    })
  }

  enableRegisterUser() {
    this.isEnableRegisterUser = !this.isEnableRegisterUser;
  }

  registerUser() {
    this.authService.register(this.userName, this.password).subscribe(resp => {
      this.toastr.success('User created successfully');
    }, error => {
      this.toastr.error('Failed to create user.');
    })
  }

  getUserInformation() {
    this.authService.register(this.userName, this.password).subscribe(resp => {
      this.toastr.success('User created successfully');
    }, error => {
      this.toastr.error('Failed to create user.');
    })
  }

  clear() {

  }
}
