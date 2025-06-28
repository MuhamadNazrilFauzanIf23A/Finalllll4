import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Tambahkan RouterModule
  templateUrl: './forgot-password.component.html',
})
export class ResetPasswordRequestComponent {
  email = '';
  message = '';
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.loading) return;

    this.email = this.email.trim();
    if (!this.email) {
      this.errorMessage = 'Email tidak boleh kosong.';
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.http.post('http://localhost:8000/api/vendor/forgot-password', {
      email: this.email
    }).subscribe({
      next: () => {
        this.message = 'Token reset telah dikirim ke email Anda.';
        this.email = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Gagal mengirim link reset.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
