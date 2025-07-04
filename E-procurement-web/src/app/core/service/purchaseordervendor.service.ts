import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderVendorService {
  private baseUrl = 'http://localhost:8000/api/vendor';

  constructor(private http: HttpClient) {}

  // Mendapatkan header autentikasi (Bearer Token)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('vendorToken'); // Pastikan ini sesuai key saat login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  // Mengambil Purchase Order berdasarkan penawaran_id
  getPurchaseOrderByPenawaranId(penawaranId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/purchase-order/by-penawaran/${penawaranId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Mengupload bukti pembayaran untuk PO berdasarkan penawaran_id
  uploadBuktiPembayaran(penawaranId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('bukti_pembayaran', file);

    // Jangan set Content-Type ke multipart/form-data! Biarkan browser yang set sendiri boundary-nya.
    const token = localStorage.getItem('vendorToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // ❌ Jangan set Content-Type
    });

    return this.http.post(
      `${this.baseUrl}/purchase-order/${penawaranId}/upload-bukti`,
      formData,
      { headers }
    );
  }

  uploadRawFormData(penawaranId: number, formData: FormData): Observable<any> {
  const token = localStorage.getItem('vendorToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    // ⚠️ JANGAN tambahkan Content-Type, biarkan browser set otomatis
  });

  return this.http.post(`${this.baseUrl}/purchase-order/${penawaranId}/upload-bukti`, formData, { headers });
}



}
