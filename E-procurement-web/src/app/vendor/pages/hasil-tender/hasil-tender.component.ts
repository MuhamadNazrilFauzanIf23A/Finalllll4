import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';

@Component({
  selector: 'app-hasil-tender',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent], // <--- tambahkan RouterModule di sini
  templateUrl: './hasil-tender.component.html',
  styleUrls: ['./hasil-tender.component.scss']
})
export class HasilTenderComponent {
  hasilTenderList = [
    {
      id: '1',
      namaProyek: 'Pengadaan Laptop Guru',
      status: 'Menang',
      nilaiKontrak: 47500000,
      poFile: 'https://example.com/po/laptop-guru.pdf'
    },
    {
      id: '2',
      namaProyek: 'Renovasi Lab Kimia',
      status: 'Tidak Menang',
      nilaiKontrak: null,
      poFile: null
    }
  ];
}
