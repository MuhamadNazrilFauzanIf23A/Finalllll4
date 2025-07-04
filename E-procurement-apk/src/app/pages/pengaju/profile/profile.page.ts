import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router untuk navigasi

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, SidebarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePage implements OnInit {
  user: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUserData();
  }

  // Fungsi untuk mengambil data user
  getUserData() {
    const token = localStorage.getItem('apk_token');  // Ambil token dari localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Gunakan token untuk otentikasi
    });

    // Memanggil API untuk mengambil data user
    this.http.get('http://localhost:8000/api/apk/me', { headers }).subscribe({
      next: (res) => {
        console.log('✅ Data user diterima:', res);  // ✅ Tambahkan ini
        this.user = res;
      },
      error: (err) => {
        console.error('❌ Gagal ambil data user:', err);
      }
    });
  }

  // Fungsi untuk mendapatkan gambar profil sesuai role
  getProfileImage(): string {
    if (this.user?.role === 'pengaju') {
      return 'assets/img/pengaju.jpg';  // Gambar khusus untuk pengaju
    } else {
      return `https://ui-avatars.com/api/?name=${this.user?.nama || 'User'}&background=0D6EFD&color=fff`;  // Avatar default jika tidak pengaju
    }
  }

  // Fungsi untuk logout
  logout() {
    localStorage.removeItem('apk_token');  // Menghapus token dari localStorage
    this.router.navigate(['/login']);  // Arahkan ke halaman login setelah logout
  }
}
