import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any = {};
  otpauthURL: any;
  qrCode: any;
  backupCodes: any;
  isMFAConfigured: boolean = false

  constructor(private authService: AuthService, private router: Router,
    private profileService: ProfileService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  configureMFA() {
    this.authService.enableTotp(this.userInfo.username).subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.otpauthURL = data.otpauthURL;
        this.qrCode = data.qrCode;
        this.backupCodes = data.backupCodes;
        this.isMFAConfigured = true;
      }
    }, error => {
      console.log(error);
      this.isMFAConfigured = false;

    })
  }

  disableMFA() {
    this.authService.disableTotp(this.userInfo.username).subscribe(resp => {

    }, error => {
      console.log(error);
    })
  }

  getProfile() {
    this.profileService.getProfile().subscribe((resp: any) => {
      console.log(resp);
      this.userInfo = resp.userInfo;
      console.log(this.userInfo.username);
      localStorage.setItem('userName', this.userInfo.username)
      
      this.sharedService.userName = this.userInfo.username;
    })
  }
}
