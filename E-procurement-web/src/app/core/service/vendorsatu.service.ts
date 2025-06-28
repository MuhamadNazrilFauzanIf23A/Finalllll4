import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorsatuService {
private API_URL = 'http://localhost:8000/api/vendor';

  constructor(private http: HttpClient) {}

    registerVendor(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, formData); // ✅ Benar
    }
}
