import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service'; // pastikan path sesuai strukturmu

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: async (res) => {
        this.authService.saveToken(res.access_token);

        const role = res.user.role;

        if (role === 'pengaju') {
          this.navCtrl.navigateForward('/pengajuan-form');
        } else if (role === 'atasan') {
          this.navCtrl.navigateForward('/verifikasi'); // pastikan route '/verifikasi' ada
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Role tidak dikenali.',
            duration: 2000,
            color: 'danger',
          });
          await toast.present();
        }
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: err.error?.message || 'Login gagal, silakan coba lagi.',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }
}
