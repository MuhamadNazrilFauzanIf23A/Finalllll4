import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async submit() {
    if (this.forgotForm.valid) {
      const toast = await this.toastCtrl.create({
        message: 'Link reset telah dikirim ke email Anda.',
        duration: 3000,
        color: 'success',
      });
      toast.present();
      this.navCtrl.navigateBack('/login');
    }
  }
}
