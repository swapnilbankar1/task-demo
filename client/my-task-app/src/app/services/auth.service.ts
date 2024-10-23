import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    register(username: string, password: string) {
        return this.http.post('http://localhost:3000/api/user/register-user', { username, password });
    }

    login(username: string, password: string) {
        return this.http.post('http://localhost:3000/api/user/login', { username, password });
    }

    isLoggedIn() {
        return !!this.cookieService.get('token');
    }

}
