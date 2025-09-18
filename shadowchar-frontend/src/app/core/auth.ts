import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/auth';

  // BehaviorSubject para saber o estado de login em tempo real
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((response) => {
        this.saveToken(response.access_token);
        this.loggedIn.next(true);
        this.router.navigate(['/characters']);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        this.removeToken();
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.removeToken();
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  refreshToken(): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/refresh`, {}).pipe(
      tap((response) => {
        this.saveToken(response.access_token);
      })
    );
  }

  // --- Métodos auxiliares para manipulação do token ---

  private saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private removeToken(): void {
    localStorage.removeItem('access_token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
