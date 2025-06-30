import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { PermintaanService } from 'src/app/core/services/permintaan.service';

@Component({
  selector: 'app-riwayat',
  standalone: true,
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, SidebarComponent],
})
export class RiwayatPage implements OnInit {
  riwayatList: any[] = [];

  constructor(private permintaanService: PermintaanService) {}

  ngOnInit() {
    this.permintaanService.getUserPermintaan().subscribe({
      next: (res) => {
        this.riwayatList = res.map((item: any) => ({
          nama_proyek: item.nama_proyek,
          tanggal: item.created_at,
          alasan: item.alasan || '-',
          dokumen: item.file_pdf || null,
        }));
      },
      error: (err) => {
        console.error('❌ Gagal ambil riwayat:', err);
      }
    });
  }

  lihatDokumen(url: string) {
    if (url) window.open(url, '_blank');
  }
}
