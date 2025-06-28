import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service'; // pastikan path ini benar

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {}

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('sidebar-show');
    }
  }

  logout() {
    this.authService.logout();              // Hapus token
    this.router.navigate(['/admin']);       // Kembali ke halaman login
  }
}
