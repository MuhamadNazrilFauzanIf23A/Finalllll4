import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermintaanService {
  private apiUrl = 'http://localhost:8000/api/apk/permintaan'; // ⬅️ Sesuaikan endpoint Laravel

  constructor(private http: HttpClient) {}

  /**
   * Ambil token dari localStorage dan buat Authorization header
   */
private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('apk_token'); 
  console.log('🔐 Token dari localStorage (apk_token):', token);

  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
}

  /**
   * Kirim permintaan baru dari form pengaju
   */
  createPermintaan(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.post(this.apiUrl, formData, { headers });
  }

  /**
   * Ambil semua permintaan milik user yang login (riwayat/status)
   */
  getUserPermintaan(): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.get(this.apiUrl, { headers });
  }

  /**
   * Ambil permintaan tertentu berdasarkan ID (opsional)
   */
  getById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
}