import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorProfileService {
  private BASE_URL = 'http://localhost:8000/api/vendor';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('vendorToken'); // pastikan disimpan saat login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/profile`, {
      headers: this.getAuthHeaders()
    });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/profile`, data, {
      headers: this.getAuthHeaders()
    });
  }

  uploadLegalitas(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('dokumen_legalitas', file);

    return this.http.post(`${this.BASE_URL}/upload-legalitas`, formData, {
      headers: this.getAuthHeaders()
    });
  }
}
