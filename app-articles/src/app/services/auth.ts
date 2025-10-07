import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ code: string, data: string, message: string }>(
      `${this.baseUrl}/login`, 
      { email, password }
    ).pipe(
      tap(response => {
        // stocker le token dans le localStorage
        localStorage.setItem('token', response.data);
      })
    );
  }

  signup(user: {
    email: string;
    password: string;
    pseudo: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

getToken(): string | null {
  return localStorage.getItem('token');
}

forgotPasswordCustom(email: string, newPassword: string, newPasswordConfirm: string) {
  return this.http.post(`${this.baseUrl}/reset-password`, { email, newPassword, newPasswordConfirm });
}
}