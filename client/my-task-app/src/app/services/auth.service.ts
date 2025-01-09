import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookies.service';
import { map, Observable } from 'rxjs';

interface AuthResponse {
    username: string,
    password: string,
    backupCode: any[],
    token: string
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = 'http://localhost:3000/api/user';

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    register(username: string, password: string) {
        return this.http.post(`${this.baseUrl}/register-user`, { username, password });
    }

    login(username: string, password: string) {
        return this.http.post(`${this.baseUrl}/login`, { username, password });
    }

    isLoggedIn() {
        const result = !!this.cookieService.getCookie('token');
        return result;
    }

    logout() {
        this.cookieService.eraseCookie('token');
    }

    enableTotp(username: string): Observable<{ otpauthURL: string, qrCode: string, backupCodes: string[] }> {
        return this.http.post<any>(`${this.baseUrl}/totp/enable`, { username });
    }

    disableTotp(username: string): Observable<{ otpauthURL: string, qrCode: string, backupCodes: string[] }> {
        return this.http.post<any>(`${this.baseUrl}/totp/disable`, { username });
    }

    loginWithBackupCode(credentials: any): Observable<string> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login/backup`, credentials)
            .pipe(map(res => res.token));
    }
}
