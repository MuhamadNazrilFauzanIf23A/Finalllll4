import { Routes } from '@angular/router';

export const vendorRoutes: Routes = [
  // Default redirect: /vendor → /vendor/login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 🔐 Login Vendor
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.VendorLoginComponent)
  },

  // 🔑 Forgot Password
  {
    path: 'forgot-password',
    loadComponent: () =>
     import('./auth/login/forgot-password.component').then(m => m.ResetPasswordRequestComponent)
  },

  {
  path: 'reset-password',
  loadComponent: () =>
    import('./auth/login/resetpassword.component').then(m => m.ResetPasswordComponent)
 },
  // 📝 Registrasi Vendor
  {
    path: 'registrasi',
    loadComponent: () =>
      import('./auth/regist/register.component').then(m => m.RegisterComponent)
  },

  // 📊 Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.VendorDashboardComponent)
  },

  // 📤 Pengajuan Penawaran
  {
    path: 'submit-penawaran',
    loadComponent: () =>
      import('./pages/submit-penawaran/submit-penawaran.component').then(m => m.SubmitPenawaranComponent),
    title: 'Pengajuan Penawaran'
  },

  // 📄 Detail Tender
  {
    path: 'tender-detail/:id',
    loadComponent: () =>
      import('./pages/tender-detail/tender-detail.component').then(m => m.TenderDetailComponent),
    title: 'Detail Tender'
  },

  // 📅 Jadwal Aanwijzing
  {
    path: 'jadwal-aanwijzing',
    loadComponent: () =>
      import('./pages/jadwal-aanwijzing/jadwal-aanwijzing.component').then(m => m.JadwalAanwijzingComponent),
    title: 'Jadwal Aanwijzing'
  },

  // 🧾 Evaluasi & Bidding
  {
    path: 'bidding-evaluasi',
    loadComponent: () =>
      import('./pages/bidding-evaluasi/bidding-evaluasi.component').then(m => m.BiddingEvaluasiComponent),
    title: 'Bidding dan Evaluasi'
  },

  // 🏆 Hasil Tender
  {
    path: 'hasil-tender',
    loadComponent: () =>
      import('./pages/hasil-tender/hasil-tender.component').then(m => m.HasilTenderComponent),
    title: 'Hasil Tender & PO'
  },

  // 📄 PO Digital (Detail)
  {
    path: 'hasil-tender/:id',
    loadComponent: () =>
      import('./pages/hasil-tender/po.component').then(m => m.PoDigitalComponent)
  },

  // 👤 Profil Vendor
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(m => m.VendorProfileComponent)
  }
];
