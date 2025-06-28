import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { PenawaranService } from '../../../core/service/penawaran.service';

@Component({
  selector: 'app-tender',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './tender.html',
  styleUrls: ['./tender.scss']
})
export class TenderComponent implements OnInit {
  daftarTender: any[] = [];

  constructor(private penawaranService: PenawaranService) {}

  ngOnInit(): void {
    this.loadTender();
  }

  loadTender() {
    this.penawaranService.getAll().subscribe({
      next: (res) => {
        this.daftarTender = res.data ?? res;
      },
      error: () => {
        alert('Gagal memuat data tender');
      }
    });
  }

  simpanTender(item: any) {
    this.penawaranService.updateHarga(item.id, item.penawaran).subscribe({
      next: () => {
        alert(`Harga penawaran untuk ${item.vendor} disimpan.`);
      },
      error: () => {
        alert('Gagal menyimpan harga penawaran');
      }
    });
  }

  tandaiSelesai(item: any) {
    if (!item.terverifikasi) {
      alert('Dokumen belum diverifikasi.');
      return;
    }

    this.penawaranService.tandaiSelesai(item.id).subscribe({
      next: () => {
        item.status = 'Selesai';
        alert(`Tender ${item.vendor} ditandai selesai & PO diterbitkan.`);
      },
      error: () => alert('Gagal menandai selesai')
    });
  }

  verifikasiDokumen(item: any) {
    this.penawaranService.verifikasi(item.id).subscribe({
      next: () => {
        item.terverifikasi = true;
        alert(`Dokumen ${item.vendor} telah diverifikasi.`);
      },
      error: () => alert('Gagal memverifikasi dokumen')
    });
  }
}
