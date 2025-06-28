import { Routes } from '@angular/router';

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
    path: 'pengajuan-form',
    loadComponent: () =>
      import('./pages/pengaju/pengajuan-form/pengajuan-form.page').then((m) => m.PengajuanFormPage),
  },
  {
    path: 'status',
    loadComponent: () =>
      import('./pages/pengaju/status/status.page').then((m) => m.StatusPage),
  },
  {
    path: 'riwayat',
    loadComponent: () =>
      import('./pages/pengaju/riwayat/riwayat.page').then((m) => m.RiwayatPage),
  },
  {
    path: 'profil',
    loadComponent: () =>
      import('./pages/pengaju/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'verifikasi',
    loadComponent: () =>
      import('./pages/atasan/verifikasi/verifikasi.page').then( m => m.VerifikasiPage)
  },
  {
    path: 'rekap',
    loadComponent: () => 
      import('./pages/atasan/rekap/rekap.page').then( m => m.RekapPage)
  },
  {
   path: 'profil-atasan',
  loadComponent: () =>
    import('./pages/atasan/profile/profile.page').then(m => m.ProfilAtasanPage)
  },
];
  