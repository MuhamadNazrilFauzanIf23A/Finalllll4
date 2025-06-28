import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.navCtrl.navigateForward('/pengajuan-form');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  goToForgotPassword() {
  this.navCtrl.navigateForward('/forgot-password');
}
}

