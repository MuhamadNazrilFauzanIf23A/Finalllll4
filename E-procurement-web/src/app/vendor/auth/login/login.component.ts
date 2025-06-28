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

  onLogin() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        localStorage.setItem('vendorToken', res.token);
        this.router.navigate(['/vendor/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Login gagal: email atau password salah';
        console.error(err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/vendor/registrasi']);
  }

  goToForgotPassword() {
    this.router.navigate(['/vendor/forgot-password']);
  }
}
