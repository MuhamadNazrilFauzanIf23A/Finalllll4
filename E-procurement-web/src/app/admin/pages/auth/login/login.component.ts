import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    const data = { email: this.email, password: this.password };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token); 
        localStorage.setItem('admin', JSON.stringify(res.admin)); 
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Terjadi kesalahan';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}
