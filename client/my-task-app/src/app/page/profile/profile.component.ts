import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.getProfile();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  getProfile() {
    this.profileService.getProfile().subscribe(resp => {
      console.log(resp);
    })
  }
}
