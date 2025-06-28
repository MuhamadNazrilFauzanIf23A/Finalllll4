import { Routes } from '@angular/router';

export const routes: Routes = [
  // Admin route group
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.adminRoutes)
  },
  // Vendor route group
  {
    path: 'vendor',
    loadChildren: () =>
      import('./vendor/vendor.routes').then(m => m.vendorRoutes)
  },
  // Optional: catch-all to redirect to 404 or login vendor
  {
    path: '',
    redirectTo: 'vendor',
    pathMatch: 'full'
  }
];
