// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:8000/api/apk';

  constructor(private http: HttpClient) {}

  /**
   * Login ke backend APK
   */
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  /**
   * Simpan token ke localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem('apk_token', token);
  }

  /**
   * Ambil token dari localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('apk_token');
  }

  /**
   * Hapus token dari localStorage
   */
  logout(): void {
    localStorage.removeItem('apk_token');
  }

  /**
   * Request forgot password
   */
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/forgot-password`, { email });
  }

  /**
   * Reset password dengan token
   */
  resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/reset-password`, data);
  }

  /**
   * Ambil data user yang sedang login
   */
  getUserData(): Observable<any> {
    const token = localStorage.getItem('apk_token');
    return this.http.get<any>(`${this.BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
