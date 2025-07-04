import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AccPermintaanService } from '../../../core/service/AccPermintaan.service'; 

@Component({
  selector: 'app-tender',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './tender.html',
  styleUrls: ['./tender.scss']
})
export class TenderComponent implements OnInit {
  daftarTender: any[] = [];

  constructor(private accPermintaanService: AccPermintaanService) {}

  ngOnInit(): void {
    this.loadTender();
  }

  // Mengambil data tender dari service
  loadTender() {
    this.accPermintaanService.getAllPenawaran().subscribe({
      next: (res) => {
        this.daftarTender = res.data ?? res;
      },
      error: () => {
        alert('Gagal memuat data tender');
      }
    });
  }

  // Memverifikasi (atau verifikasi ulang) dokumen
  verifikasiDokumen(item: any) {
    const updatedStatus = item.status;
    const updatedHarga = item.harga_penawaran;

    this.accPermintaanService.verifikasiDokumen(item.id, updatedStatus, updatedHarga).subscribe({
      next: () => {
        item.verifikasi = true;
        alert(`Dokumen ${item.vendor} berhasil diverifikasi.`);
      },
      error: () => alert('Gagal memverifikasi dokumen')
    });
  }
}
