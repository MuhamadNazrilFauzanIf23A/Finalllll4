import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { PengadaanService } from '../../../core/service/pengadaan.service';
import { PermintaanService } from '../../../core/service/permintaan.service';

@Component({
  selector: 'app-input-vendor',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './input-vendor.html',
  styleUrls: ['./input-vendor.scss']
})
export class InputVendorComponent implements OnInit {
  selectedPermintaanId: number | null = null;
  daftarPermintaan: any[] = [];
  daftarPengadaan: any[] = [];

  constructor(
    private pengadaanService: PengadaanService,
    private permintaanService: PermintaanService
  ) {}

  ngOnInit(): void {
    this.loadPermintaan();
    this.loadPengadaan();
  }

  loadPermintaan() {
    this.permintaanService.getAll().subscribe((res: any) => {
      const data = res.data ?? res;
      this.daftarPermintaan = (data || []).filter((p: any) =>
        (p.status || '').toLowerCase() === 'disetujui'
      );
    });
  }

  loadPengadaan() {
    this.pengadaanService.getAll().subscribe((res: any) => {
      this.daftarPengadaan = res.data ?? res;
    });
  }

  tambahPengadaan() {
    if (!this.selectedPermintaanId) return;

    this.pengadaanService.create({ permintaan_id: this.selectedPermintaanId }).subscribe(() => {
      alert('Proyek pengadaan berhasil ditambahkan!');
      this.selectedPermintaanId = null;
      this.loadPengadaan();
    });
  }

  hapusPengadaan(id: number) {
    if (confirm('Yakin ingin menghapus proyek ini?')) {
      this.pengadaanService.delete(id).subscribe(() => {
        this.loadPengadaan();
      });
    }
  }

  terbitkanTender(pengadaanId: number) {
    this.pengadaanService.publishTender(pengadaanId).subscribe({
      next: () => {
        alert('Tender berhasil dipublikasikan!');
        this.loadPengadaan();
      },
      error: () => {
        alert('Gagal mempublikasikan tender.');
      }
    });
  }
}
