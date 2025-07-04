import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorTenderService {
  private BASE_URL = 'http://localhost:8000/api/vendor'; // URL API backend

  constructor(private http: HttpClient) {}

  // Menambahkan token di header setiap kali melakukan request
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('vendorToken'); // Ambil token dari localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Tambahkan header Authorization dengan token
    });
  }

  // Mendapatkan daftar tender yang sudah dipublish
  getTenders(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/tenders`, {
      headers: this.getAuthHeaders(), // Sertakan header dengan token
    });
  }
}
