import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pengajuan {
  id: number;
  nama_proyek: string;
  spesifikasi: string;
  kuantitas: number;
  status: string;
  file_pdf: string | null; 
  tanggal_disetujui: string | null;
  created_at: string;
  updated_at: string;
  nominal: number;
  alasan: string;
}

@Injectable({ providedIn: 'root' })
export class ApprovalService {
  private baseUrl = 'http://localhost:8000/api/apk/approval';

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('apk_token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  /**
   * Ambil semua permintaan yang masih menunggu persetujuan
   */
  getMenunggu(): Observable<Pengajuan[]> {
    return this.http.get<Pengajuan[]>(this.baseUrl, this.getHeaders());
  }

  /**
   * Setujui permintaan tertentu
   */
  setujui(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/setujui`, {}, this.getHeaders());
  }

  /**
   * Tolak permintaan tertentu
   */
  tolak(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/tolak`, {}, this.getHeaders());
  }
}