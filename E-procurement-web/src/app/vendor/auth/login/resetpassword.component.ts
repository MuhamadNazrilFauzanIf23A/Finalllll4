import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resetpassword.component.html',
})
export class ResetPasswordComponent implements OnInit {
  password = '';
  confirmPassword = '';
  email = '';
  token = '';
  message = '';
  errorMessage = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token']?.trim() || '';
      this.email = params['email']?.trim() || '';
    });
  }

  onSubmit() {
    if (!this.email || !this.token) {
      this.errorMessage = 'Link reset tidak valid atau kadaluarsa.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password minimal 6 karakter.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password dan konfirmasi tidak cocok.';
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.http.post('http://localhost:8000/api/vendor/reset-password', {
      email: this.email,
      token: this.token,
      password: this.password,
      password_confirmation: this.confirmPassword
    }).subscribe({
      next: () => {
        this.message = 'Password berhasil diubah. Silakan login.';
        setTimeout(() => this.router.navigate(['/vendor/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Gagal reset password.';
      },
      complete: () => this.loading = false
    });
  }
}
