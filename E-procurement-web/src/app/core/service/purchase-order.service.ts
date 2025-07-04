import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  private BASE_URL = 'http://localhost:8000/api/admin/purchase-order';

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

  getAll(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getAuthHeaders());
  }

uploadPO(id: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file_po', file);

  return this.http.post(`${this.BASE_URL}/${id}/upload`, formData, this.getAuthHeaders());
}

tandaiSelesai(id: number): Observable<any> {
  return this.http.post(`${this.BASE_URL}/${id}/selesai`, {}, this.getAuthHeaders());
}

}
