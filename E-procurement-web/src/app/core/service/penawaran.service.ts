import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PenawaranService {
  private BASE_URL = 'http://localhost:8000/api/vendor'; // Endpoint untuk vendor

  constructor(private http: HttpClient) {}

  // Menambahkan token di header setiap kali melakukan request
  private getAuthHeaders() {
    const token = localStorage.getItem('vendorToken'); // Pastikan token vendor disimpan dengan key 'vendorToken'
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`, // Token Authorization untuk vendor
        Accept: 'application/json',
      }),
    };
  }

    // Mengecek apakah vendor sudah mengajukan penawaran untuk tender tertentu
  checkPenawaranTersedia(tenderId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/tender/${tenderId}/cek-penawaran`, this.getAuthHeaders());
  }
  
  // Mengajukan penawaran untuk tender
  submitPenawaran(formData: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}/submit-penawaran`, formData, this.getAuthHeaders());
  }

  // Mengambil data semua penawaran vendor (bisa ditambahkan jika dibutuhkan)
  getAllPenawaran(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/penawaran`, this.getAuthHeaders());
  }

  // Mengambil penawaran berdasarkan ID (misalnya untuk detail penawaran)
  getPenawaranById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/penawaran/${id}`, this.getAuthHeaders());
  }

  // Verifikasi dokumen penawaran
  verifikasi(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/penawaran/${id}/verifikasi`, {}, this.getAuthHeaders());
  }

  // Update harga penawaran
  updateHarga(id: number, harga: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/penawaran/${id}/update-harga`, { harga_penawaran: harga }, this.getAuthHeaders());
  }

  // Tandai tender sebagai selesai dan buat PO (Purchase Order)
  tandaiSelesai(id: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/penawaran/${id}/selesai`, {}, this.getAuthHeaders());
  }
}
