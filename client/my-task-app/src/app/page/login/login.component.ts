import { Component } from '@angular/core';
import { AuthService } from '../../../app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName = '';
  password = '';
  isEnableRegisterUser: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService,) {

  }

  login() {
    this.authService.login(this.userName, this.password).subscribe(resp => {
      console.log(resp);
      this.toastr.success('Login success');
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
