import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountLogin, AccountLogout } from '../../schema/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri = `${environment.SERVER_URL}/api/auth`;

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {}

  login(body: any): Observable<any> {
    console.log('POST: ', body);

    return this.http.post(`${this.uri}/login`, body);
  }

  register(body: any): Observable<any> {
    return this.http.post(`${this.uri}/register`, body);
  }

  logout(body: AccountLogout): Observable<any> {
    return this.http.post(`${this.uri}/logout`, body);
  }

  refreshToken(): Observable<any> {
    return this.http
      .post(`${this.uri}/refreshtoken`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((response: any) => {
          this.storeTokens(response.accessToken, response.refreshToken);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.getRefreshToken();
    this.refreshToken().subscribe((res) => console.log('token refreshed'));
    return !this.jwtHelper.isTokenExpired(token);
  }

  getAccessToken(): string {
    return localStorage.getItem('access-token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh-token');
  }

  getLoggedUserInfo(): any {
    return localStorage.getItem('logged-user-info') ? JSON.parse(localStorage.getItem('logged-user-info')) : undefined;
  }

  storeTokens(access: string, refresh?: string): void {
    localStorage.setItem('access-token', access);
    if (refresh) {
      localStorage.setItem('refresh-token', refresh);
    }
  }

  storeLoggedUserInfo(user: any): void {
    localStorage.setItem('logged-user-info', JSON.stringify(user.user));
  }

  clearTokens(): void {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('logged-user-info');
  }
}
