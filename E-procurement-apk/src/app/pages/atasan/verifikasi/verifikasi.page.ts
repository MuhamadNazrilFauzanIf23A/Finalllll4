import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SidebarAtasanComponent } from 'src/app/components/sidebar-atasan/sidebar-atasan.component';
import { ApprovalService, Pengajuan } from 'src/app/core/services/approval.service';

@Component({
  selector: 'app-verifikasi',
  standalone: true,
  templateUrl: './verifikasi.page.html',
  styleUrls: ['./verifikasi.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, SidebarAtasanComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VerifikasiPage implements OnInit {
  daftarPengajuan: Pengajuan[] = [];

  constructor(private approvalService: ApprovalService) {}

  ngOnInit() {
    this.loadPengajuan();
  }

  loadPengajuan() {
    this.approvalService.getMenunggu().subscribe({
      next: (res: any) => {
        this.daftarPengajuan = res.data ?? [];
      },
      error: (err) => {
        console.error('❌ Gagal ambil data:', err);
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

  setujui(pengajuan: Pengajuan) {
    this.approvalService.setujui(pengajuan.id).subscribe({
      next: () => {
        pengajuan.status = 'Disetujui';
        pengajuan.tanggal_disetujui = new Date().toISOString();
        // atau bisa pakai this.loadPengajuan(); untuk sinkronisasi ulang
      },
      error: (err) => {
        console.error('❌ Gagal menyetujui:', err);
      }
    });
  }

  tolak(pengajuan: Pengajuan) {
    this.approvalService.tolak(pengajuan.id).subscribe({
      next: () => {
        pengajuan.status = 'Ditolak';
      },
      error: (err) => {
        console.error('❌ Gagal menolak:', err);
      }
    });
  }

  beriCatatan(pengajuan: Pengajuan) {
    console.log('📝 Tambah catatan (fitur opsional)', pengajuan);
  }
}
