import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SidebarAtasanComponent } from 'src/app/components/sidebar-atasan/sidebar-atasan.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profil-atasan',
  standalone: true,
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    SidebarAtasanComponent,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilAtasanPage implements OnInit {
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const token = localStorage.getItem('apk_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get('http://localhost:8000/api/apk/me', { headers }).subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('❌ Gagal ambil data user:', err);
      }
    });
  }
}
