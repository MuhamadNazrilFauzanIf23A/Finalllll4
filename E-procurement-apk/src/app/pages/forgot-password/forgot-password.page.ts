import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class ForgotPasswordPage {
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async submit() {
    if (this.forgotForm.invalid) return;

    const email = this.forgotForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: async (res) => {
        const toast = await this.toastCtrl.create({
          message: 'Token telah dikirim ke email. Lanjutkan ke halaman Reset Password.',
          duration: 3000,
          color: 'success',
        });
        await toast.present();
        // tidak redirect langsung, biarkan user klik sendiri
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: err.error?.message || 'Gagal mengirim link reset.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      }
    });
  }

  goToReset() {
    this.navCtrl.navigateForward('/reset-password');
  }
}
