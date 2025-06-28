import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LaporanService {
  private apiUrl = 'http://localhost:8000/api/admin/laporan';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
    return this.http.get(this.apiUrl, { headers });
  }
}
