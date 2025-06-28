import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-status',
  standalone: true,
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, SidebarComponent],
})    
export class StatusPage {
  daftarPengajuan = [
    {
      namaItem: 'Laptop Dell Inspiron',
      tanggal: '2025-06-27',
      spesifikasi: 'Intel i5, 16GB RAM, SSD 512GB',
      status: 'Diproses',
    },
    {
      namaItem: 'Meja Kerja Kayu',
      tanggal: '2025-06-20',
      spesifikasi: 'Ukuran 160x80 cm, warna coklat tua',
      status: 'Disetujui',
    },
    {
      namaItem: 'Printer Epson L3210',
      tanggal: '2025-06-15',
      spesifikasi: 'Untuk cetak dokumen tim marketing',
      status: 'Ditolak',
    },
    {
      namaItem: 'Printer Epson L3210',
      tanggal: '2025-06-15',
      spesifikasi: 'Untuk cetak dokumen tim marketing',
      status: 'Ditolak',
    },
    {
      namaItem: 'Printer Epson L3210',
      tanggal: '2025-06-15',
      spesifikasi: 'Untuk cetak dokumen tim marketing',
      status: 'Ditolak',
    },
    {
      namaItem: 'Printer Epson L3210',
      tanggal: '2025-06-15',
      spesifikasi: 'Untuk cetak dokumen tim marketing',
      status: 'Ditolak',
    },
    {
      namaItem: 'Printer Epson L3210',
      tanggal: '2025-06-15',
      spesifikasi: 'Untuk cetak dokumen tim marketing',
      status: 'Ditolak',
    },
  ];

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'disetujui':
        return 'success';
      case 'diproses':
        return 'warning';
      case 'ditolak':
        return 'danger';
      default:
        return 'medium';
    }
  }
}
