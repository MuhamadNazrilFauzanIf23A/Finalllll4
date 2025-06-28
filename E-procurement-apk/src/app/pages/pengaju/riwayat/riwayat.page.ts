import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-riwayat',
  standalone: true,
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, SidebarComponent],
})
export class RiwayatPage {
  riwayatList = [
    {
      namaItem: 'Printer Epson L3210',
      tanggal: '2025-06-20',
      alasan: 'Untuk cetak dokumen tim marketing.',
      dokumen: 'https://example.com/dokumen1.pdf',
    },
    {
      namaItem: 'Meja Kerja',
      tanggal: '2025-06-15',
      alasan: 'Meja untuk karyawan baru.',
      dokumen: null,
    }
  ];

  lihatDokumen(url: string) {
    window.open(url, '_blank');
  }
}
