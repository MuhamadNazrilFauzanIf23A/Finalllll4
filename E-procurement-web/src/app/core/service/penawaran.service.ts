import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PenawaranService {
  private BASE_URL = 'http://localhost:8000/api/admin/penawaran';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    };
  }

  // Ambil semua penawaran
  getAll(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getAuthHeaders());
  }

  // Verifikasi dokumen penawaran
  verifikasi(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}/verifikasi`, {}, this.getAuthHeaders());
  }

  // Update harga penawaran
  updateHarga(id: number, harga: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${id}/update-harga`, { harga_penawaran: harga }, this.getAuthHeaders());
  }

  // Tandai tender sebagai selesai & buat PO
  tandaiSelesai(id: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${id}/selesai`, {}, this.getAuthHeaders());
  }
}
