import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (!token) {
    const router = inject(Router);
    router.navigate(['/admin']); // ⬅️ arahkan ke halaman login
    return false;
  }
  return true;
};
