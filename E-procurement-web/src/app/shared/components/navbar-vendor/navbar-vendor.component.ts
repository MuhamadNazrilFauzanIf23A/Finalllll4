import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router

@Component({
  selector: 'app-navbar-vendor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-vendor.component.html',
  styleUrls: ['./navbar-vendor.component.scss']
})
export class NavbarVendorComponent {
  constructor(private renderer: Renderer2, private router: Router) {}

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('sidebar-show');
    }
  }

  logout() {
    localStorage.removeItem('vendorToken'); // Hapus token
    this.router.navigate(['/vendor/login']); // Redirect ke halaman login
  }
}
