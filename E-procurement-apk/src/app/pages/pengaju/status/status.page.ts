import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PermintaanService } from 'src/app/core/services/permintaan.service';

@Component({
  selector: 'app-status',
  standalone: true,
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, SidebarComponent],
})
export class StatusPage implements OnInit {
  daftarPengajuan: any[] = [];

  constructor(private permintaanService: PermintaanService) {}

  ngOnInit() {
    this.loadStatusPengajuan();
  }

  loadStatusPengajuan() {
    this.permintaanService.getUserPermintaan().subscribe({
      next: (res) => {
        this.daftarPengajuan = res.map((item: any) => ({
          nama_proyek: item.nama_proyek,
          spesifikasi: item.spesifikasi,
          status: item.status,
          tanggal: item.tanggal_disetujui || item.created_at,
        }));
      },
      error: (err) => {
        console.error('❌ Gagal ambil status:', err);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'disetujui': return 'success';
      case 'menunggu': return 'warning';
      case 'ditolak': return 'danger';
      default: return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'disetujui': return 'checkmark-circle';
      case 'ditolak': return 'close-circle';
      case 'menunggu': return 'hourglass';
      default: return 'help-circle';
    }
  }
}
