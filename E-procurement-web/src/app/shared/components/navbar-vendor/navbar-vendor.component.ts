import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-vendor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-vendor.component.html',
  styleUrls: ['./navbar-vendor.component.scss']
})
export class NavbarVendorComponent {
  constructor(private renderer: Renderer2) {}

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('sidebar-show');
    }
  }
}