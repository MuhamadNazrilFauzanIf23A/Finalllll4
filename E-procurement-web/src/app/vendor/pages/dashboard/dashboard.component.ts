import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class VendorDashboardComponent {
  tenderList = [
  {
    id: '1',
    nama: 'Pengadaan Laptop Guru',
    kategori: 'Barang',
    deskripsi: 'Pengadaan 50 unit laptop untuk guru SMK.',
    batas: new Date('2025-06-30'),
    gambar: 'https://via.placeholder.com/300x200?text=Laptop'
  },
  {
    id: '2',
    nama: 'Renovasi Lab Kimia',
    kategori: 'Konstruksi',
    deskripsi: 'Renovasi laboratorium kimia lengkap dengan interior.',
    batas: new Date('2025-07-10'),
    gambar: 'https://via.placeholder.com/300x200?text=Lab+Kimia'
  }
];

}
