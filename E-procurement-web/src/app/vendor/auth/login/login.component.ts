import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorAuthService } from '../../../core/service/vendor-auth.service';

@Component({
  selector: 'app-vendor-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class VendorLoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: VendorAuthService) {}

  // Fungsi untuk login ketika form disubmit
  onLogin() {
    const payload = {
      email: this.email,
      password: this.password
    };

    // Memanggil method login dari VendorAuthService
    this.authService.login(payload).subscribe({
      next: (res) => {
        // Menyimpan token di localStorage setelah login berhasil
        this.authService.saveVendorData(res.token, res.vendor.id); // Simpan token dan ID

        // Arahkan ke halaman dashboard/vendor
        this.router.navigate(['/vendor/dashboard']);
      },
      error: (err) => {
        // Menampilkan error jika login gagal
        this.errorMessage = 'Login gagal: email atau password salah';
        console.error('Error login:', err);
      }
    });
  }

  // Fungsi untuk menuju halaman registrasi
  goToRegister() {
    this.router.navigate(['/vendor/registrasi']);
  }

  // Fungsi untuk menuju halaman forgot password
  goToForgotPassword() {
    this.router.navigate(['/vendor/forgot-password']);
  }
}
