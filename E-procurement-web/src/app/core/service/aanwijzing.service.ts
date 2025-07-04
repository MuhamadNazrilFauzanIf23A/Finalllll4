import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AanwijzingService {
  private apiUrl = 'http://localhost:8000/api/admin/aanwijzing';  // URL untuk admin

  constructor(private http: HttpClient) {}

  // Mendapatkan semua data aanwijzing untuk admin
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Membuat data aanwijzing baru
  create(data: { pengadaan_id: number, tanggal: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Upload dokumen penawaran untuk admin
  uploadDokumen(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('dokumen', file);
    return this.http.post(`${this.apiUrl}/${id}/upload`, formData);
  }

  // Mendapatkan jumlah vendor terdaftar berdasarkan vendor_id
  getVendorCount(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/vendor-count`);
  }

}
