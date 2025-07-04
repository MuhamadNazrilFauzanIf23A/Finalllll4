import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SidebarAtasanComponent } from 'src/app/components/sidebar-atasan/sidebar-atasan.component';
import { PermintaanService } from 'src/app/core/services/permintaan.service'; 

@Component({
  selector: 'app-rekap',
  standalone: true,
  imports: [CommonModule, IonicModule, SidebarAtasanComponent],
  templateUrl: './rekap.page.html',
  styleUrls: ['./rekap.page.scss'],
})
export class RekapPage implements OnInit {
  daftarRekap: any[] = []; // Data pengajuan yang akan ditampilkan

  constructor(private permintaanService: PermintaanService) {}

  ngOnInit() {
    this.loadRekapData(); // Ambil data ketika halaman pertama kali dibuka
  }

loadRekapData() {
  this.permintaanService.getUserPermintaan().subscribe({
    next: (res) => {
      console.log('Data rekap diterima:', res); 
      // Menampilkan data yang diterima
      this.daftarRekap = res.map((item: any) => ({
        nama_proyek: item.nama_proyek,
        tanggal: item.tanggal_disetujui || item.created_at,
        divisi: item.divisi,
        status: item.status,
      }));
    },
    error: (err) => {
      console.error('❌ Gagal mengambil data rekap:', err);
    }
  });
}


  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'disetujui': return 'success';
      case 'ditolak': return 'danger';
      case 'menunggu': return 'warning';
      default: return 'medium';
    }
  }
}
