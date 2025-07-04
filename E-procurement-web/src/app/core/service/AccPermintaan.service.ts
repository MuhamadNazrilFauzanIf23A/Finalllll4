import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccPermintaanService {
  private BASE_URL = 'http://localhost:8000/api/admin/penawaran'; // URL API backend untuk admin

  constructor(private http: HttpClient) {}

  // Menambahkan token di header setiap kali melakukan request
  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('adminToken'); // Ambil token dari localStorage
      return new HttpHeaders({
          Authorization: `Bearer ${token}`, // Tambahkan header Authorization dengan token
        });
    }
    
    // Mengambil semua penawaran dengan nama proyek dan vendor
    getAllPenawaran(): Observable<any> {
      return this.http.get(`${this.BASE_URL}`, {
        headers: this.getAuthHeaders(),
      });
    }
    
  // Verifikasi dokumen penawaran dan update status serta harga
  verifikasiDokumen(id: number, status: string, harga: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}/verifikasi`, { 
      status: status, 
      harga_penawaran: harga 
    }, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update harga penawaran
  updateHarga(id: number, harga: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${id}/update-harga`, { harga_penawaran: harga }, {
      headers: this.getAuthHeaders(),
    });
  }

  // Menetapkan status tender ke "Evaluasi", "Lolos", atau "Gugur"
  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}/status`, { status: status }, {
      headers: this.getAuthHeaders(),
    });
  }
}

