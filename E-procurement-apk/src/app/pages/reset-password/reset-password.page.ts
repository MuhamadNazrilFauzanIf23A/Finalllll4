import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class ResetPasswordPage {
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  async submit() {
    if (this.resetForm.invalid) return;

    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: async (res) => {
        const toast = await this.toastCtrl.create({
          message: res.message || 'Password berhasil direset.',
          duration: 3000,
          color: 'success',
        });
        await toast.present();
        this.navCtrl.navigateBack('/login');
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: err.error?.message || 'Reset gagal. Cek data Anda.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      }
    });
  }
}
