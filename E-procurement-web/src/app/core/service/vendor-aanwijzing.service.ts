import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorAanwijzingService {
  private apiUrl = 'http://localhost:8000/api/vendor/aanwijzing';  // URL untuk mengambil data aanwijzing vendor

  constructor(private http: HttpClient) {}

  // Mendapatkan header autentikasi dengan token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('vendorToken');  // Ambil token dari localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Menambahkan header Authorization dengan token
    });
  }

  // Mengambil data aanwijzing untuk vendor
  getVendorAanwijzing(): Observable<any[]> {
    const headers = this.getAuthHeaders();  // Mendapatkan header dengan token

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching aanwijzing data', error);
        throw error;  // Tangani error sesuai kebutuhan
      })
    );
  }

    // Mengonfirmasi kehadiran vendor
  followAanwijzing(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${id}/follow`, {}, { headers }).pipe(
      catchError((error) => {
        console.error('Error following aanwijzing', error);
        throw error;
      })
    );
  }
}
