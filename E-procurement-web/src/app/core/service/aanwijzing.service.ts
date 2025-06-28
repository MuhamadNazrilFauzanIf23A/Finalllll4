import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AanwijzingService {
  private apiUrl = 'http://localhost:8000/api/admin/aanwijzing';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(data: { pengadaan_id: number, tanggal: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  uploadDokumen(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('dokumen', file);
    return this.http.post(`${this.apiUrl}/${id}/upload`, formData);
  }
}
