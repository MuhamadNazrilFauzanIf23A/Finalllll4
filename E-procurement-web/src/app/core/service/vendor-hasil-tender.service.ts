import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HasilTenderService {
  private BASE_URL = 'http://localhost:8000/api/vendor/hasil-tender';

  constructor(private http: HttpClient) {}

  // Ambil token dari localStorage dan tambahkan ke header Authorization
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('vendorToken'); // Pastikan ini sesuai key saat login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  // Ambil hasil tender
  getHasilTender(): Observable<any> {
    return this.http.get(this.BASE_URL, { headers: this.getAuthHeaders() });
  }
}

