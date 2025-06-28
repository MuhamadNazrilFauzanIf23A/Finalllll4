import { Routes } from '@angular/router';
import { authGuard } from '../core/guard/auth.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Admin Login'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard Admin',
    canActivate: [authGuard]
  },
  {
    path: 'aanwijzing',
    loadComponent: () =>
      import('./pages/aanwijzing/aanwijzing.component').then(m => m.AanwijzingComponent),
    title: 'Aanwijzing',
    canActivate: [authGuard]
  },
  {
    path: 'input-vendor',
    loadComponent: () =>
      import('./pages/input-vendor/input-vendor.component').then(m => m.InputVendorComponent),
    title: 'Input Vendor',
    canActivate: [authGuard]
  },
  {
    path: 'manage-requests',
    loadComponent: () =>
      import('./pages/manage-request/manage-request.component').then(m => m.ManageRequestsComponent),
    title: 'Manage Requests',
    canActivate: [authGuard]
  },
  {
    path: 'purchase-order',
    loadComponent: () =>
      import('./pages/purchase-order/purchase-order.component').then(m => m.PurchaseOrderComponent),
    title: 'Purchase Order',
    canActivate: [authGuard]
  },
  {
    path: 'tender',
    loadComponent: () =>
      import('./pages/tender/tender.component').then(m => m.TenderComponent),
    title: 'Tender',
    canActivate: [authGuard]
  },
  {
    path: 'laporan',
    loadComponent: () =>
      import('./pages/laporan/laporan.component').then(m => m.LaporanComponent),
    title: 'Laporan Pengadaan',
    canActivate: [authGuard]
  },
  {
    path: 'manage-requests/:id',
    loadComponent: () =>
      import('./pages/manage-request/detail-request.component').then(m => m.DetailRequestComponent),
    title: 'Detail Permintaan',
    canActivate: [authGuard]
  }
];
