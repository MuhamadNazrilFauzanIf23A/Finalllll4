import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SidebarAtasanComponent } from 'src/app/components/sidebar-atasan/sidebar-atasan.component';

@Component({
  selector: 'app-verifikasi',
  standalone: true,
  templateUrl: './verifikasi.page.html',
  styleUrls: ['./verifikasi.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidebarAtasanComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VerifikasiPage {
  daftarPengajuan = [
    {
      namaItem: 'Laptop ASUS A416',
      tanggal: '2025-06-27',
      spesifikasi: 'Intel i5, 8GB RAM, SSD 512GB',
      status: 'Menunggu',
    },
    {
      namaItem: 'Laptop ASUS A416',
      tanggal: '2025-06-27',
      spesifikasi: 'Intel i5, 8GB RAM, SSD 512GB',
      status: 'Menunggu',
    },
    {
      namaItem: 'Laptop ASUS A416',
      tanggal: '2025-06-27',
      spesifikasi: 'Intel i5, 8GB RAM, SSD 512GB',
      status: 'Menunggu',
    },
    {
      namaItem: 'Laptop ASUS A416',
      tanggal: '2025-06-27',
      spesifikasi: 'Intel i5, 8GB RAM, SSD 512GB',
      status: 'Disetujui',
    },
    // Tambahkan data lain jika perlu
  ];

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'disetujui': return 'success';
      case 'ditolak': return 'danger';
      case 'menunggu': return 'warning';
      default: return 'medium';
    }
  }

  setujui(pengajuan: any) {
    console.log('✅ Disetujui:', pengajuan);
  }

  tolak(pengajuan: any) {
    console.log('❌ Ditolak:', pengajuan);
  }

  beriCatatan(pengajuan: any) {
    console.log('📝 Catatan untuk:', pengajuan);
  }
}
