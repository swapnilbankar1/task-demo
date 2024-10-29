import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookies.service';

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
        const result = !!this.cookieService.getCookie('token');
        console.log(result);
        return result
    }

    logout() {
        this.cookieService.eraseCookie('token');
    }

}
