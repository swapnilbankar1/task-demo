import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookies.service';

@Component({
  selector: 'app-auth-otp',
  templateUrl: './auth-otp.component.html',
  styleUrls: ['./auth-otp.component.css']
})
export class AuthOTPComponent {
  otp: any = '';
  userName = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
    const navigation: any = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state;
      this.userName = state.username;
      this.password = state.password;
    }
  }

  authenticate() {
    this.authService.authTotp(this.userName, this.otp).subscribe(resp => {
      this.cookieService.setCookie('token', resp.token, 1);
      this.router.navigate(['/profile'])
    }, error => {

    })
  }

  cancel() {
    this.router.navigate(['/login'])
  }
}
