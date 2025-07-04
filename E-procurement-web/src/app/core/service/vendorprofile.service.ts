import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorProfileService {
  private BASE_URL = 'http://localhost:8000/api/vendor'; // Ubah sesuai API base URL Anda

  constructor(private http: HttpClient) {}

  // Menambahkan token di header setiap kali melakukan request
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('vendorToken'); // Ambil token dari localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Tambahkan header Authorization dengan token
    });
  }

  // Ambil data profil vendor
  getProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/profile`, {
      headers: this.getAuthHeaders(), // Sertakan header dengan token
    });
  }

  // Update data profil vendor
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/profile`, data, {
      headers: this.getAuthHeaders(), // Sertakan header dengan token
    });
  }

  // Upload dokumen legalitas
  uploadLegalitas(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('dokumen_legalitas', file);

    return this.http.post(`${this.BASE_URL}/upload-legalitas`, formData, {
      headers: this.getAuthHeaders(), // Sertakan header dengan token
    });
  }
}
