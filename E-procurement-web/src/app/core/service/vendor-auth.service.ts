import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorAuthService {
  private BASE_URL = 'http://localhost:8000/api/vendor'; // Ubah sesuai API base URL Anda

  constructor(private http: HttpClient) {}

  // Menambahkan token di header setiap kali melakukan request
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('vendorToken'); // Ambil token dari localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Tambahkan header Authorization dengan token
    });
  }

  // Metode login untuk vendor
  login(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, data);  // Endpoint untuk login
  }

  // Menyimpan data vendor (token, ID) ke localStorage
  saveVendorData(token: string, vendorId: string) {
    localStorage.setItem('vendorToken', token);
    localStorage.setItem('vendorId', vendorId);
  }

  // Mengambil token vendor dari localStorage
  getToken() {
    return localStorage.getItem('vendorToken');
  }

  // Mengambil ID vendor dari localStorage
  getVendorId() {
    return localStorage.getItem('vendorId');
  }

  // Menghapus data vendor dari localStorage saat logout
  logout() {
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorId');
  }
}
