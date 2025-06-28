import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PengadaanService {
  private BASE_URL = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  // 🔐 Ambil headers dengan token dari localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  // 🔄 Create pengadaan
  create(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.BASE_URL}/pengadaan`, data, { headers });
  }

  // 📦 Get all pengadaan
  getAll(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.BASE_URL}/pengadaan`, { headers });
  }

  // ❌ Delete pengadaan by ID
  delete(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.BASE_URL}/pengadaan/${id}`, { headers });
    
  }
publishTender(id: number): Observable<any> {
  const headers = this.getAuthHeaders(); // ✅ ambil token auth
  return this.http.post(`${this.BASE_URL}/tender/publish/${id}`, {}, { headers });
}

}
