import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SidebarAtasanComponent } from 'src/app/components/sidebar-atasan/sidebar-atasan.component';

@Component({
  selector: 'app-rekap',
  standalone: true,
  imports: [CommonModule, IonicModule, SidebarAtasanComponent],
  templateUrl: './rekap.page.html',
  styleUrls: ['./rekap.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RekapPage {
  daftarRekap = [
    {
      namaItem: 'Printer Epson L3210',
      tanggal: '2025-06-25',
      divisi: 'IT',
      status: 'Disetujui'
    },
    {
      namaItem: 'Kursi Ergonomis',
      tanggal: '2025-06-24',
      divisi: 'HRD',
      status: 'Menunggu'
    },
    {
      namaItem: 'Kamera DSLR',
      tanggal: '2025-06-23',
      divisi: 'Marketing',
      status: 'Ditolak'
    },
    {
      namaItem: 'Kamera DSLR',
      tanggal: '2025-06-23',
      divisi: 'Marketing',
      status: 'Ditolak'
    },
    {
      namaItem: 'Kamera DSLR',
      tanggal: '2025-06-23',
      divisi: 'Marketing',
      status: 'Ditolak'
    },
    {
      namaItem: 'Kamera DSLR',
      tanggal: '2025-06-23',
      divisi: 'Marketing',
      status: 'Ditolak'
    },
  ];

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'disetujui': return 'success';
      case 'ditolak': return 'danger';
      case 'menunggu': return 'warning';
      default: return 'medium';
    }
  }
}
