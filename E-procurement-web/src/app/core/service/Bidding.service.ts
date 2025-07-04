import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AjukanPenawaranService {
  private BASE_URL = 'http://localhost:8000/api/vendor';

  constructor(private http: HttpClient) {}

  // Ambil token vendor dari localStorage
  private getAuthHeaders() {
    const token = localStorage.getItem('vendorToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }),
    };
  }

  // Mendapatkan daftar penawaran milik vendor yang sedang login
  getPenawaranVendor(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/penawaran`, this.getAuthHeaders());
  }

  // Mengajukan penawaran baru (dengan FormData)
  submitPenawaran(formData: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}/submit-penawaran`, formData, this.getAuthHeaders());
  }

  // Update harga penawaran milik vendor
  updateHargaPenawaran(id: number, harga: number): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/penawaran/${id}/update-harga`,
      { harga_penawaran: harga },
      this.getAuthHeaders()
    );
  }
}
