import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorAuthService {
  private BASE_URL = 'http://localhost:8000/api/vendor/login';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(this.BASE_URL, data);
  }
}
