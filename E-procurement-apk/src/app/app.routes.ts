import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/Login/loginmultirole/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.page').then((m) => m.ForgotPasswordPage),
  },
  {
  path: 'reset-password',
  loadComponent: () => import('./pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage),
  },
  // 🔒 Halaman khusus Pengaju
  {
    path: 'pengajuan-form',
    loadComponent: () =>
      import('./pages/pengaju/pengajuan-form/pengajuan-form.page').then((m) => m.PengajuanFormPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'status',
    loadComponent: () =>
      import('./pages/pengaju/status/status.page').then((m) => m.StatusPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'riwayat',
    loadComponent: () =>
      import('./pages/pengaju/riwayat/riwayat.page').then((m) => m.RiwayatPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'profil',
    loadComponent: () =>
      import('./pages/pengaju/profile/profile.page').then((m) => m.ProfilePage),
    canActivate: [AuthGuard],
  },

  // 🔒 Halaman khusus Atasan
  {
    path: 'verifikasi',
    loadComponent: () =>
      import('./pages/atasan/verifikasi/verifikasi.page').then((m) => m.VerifikasiPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'rekap',
    loadComponent: () =>
      import('./pages/atasan/rekap/rekap.page').then((m) => m.RekapPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'profil-atasan',
    loadComponent: () =>
      import('./pages/atasan/profile/profile.page').then((m) => m.ProfilAtasanPage),
    canActivate: [AuthGuard],
  },
];
