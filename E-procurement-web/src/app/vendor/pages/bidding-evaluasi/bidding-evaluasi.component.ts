import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';
import { AjukanPenawaranService } from '../../../core/service/Bidding.service';

@Component({
  selector: 'app-bidding-evaluasi',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarVendorComponent],
  templateUrl: './bidding-evaluasi.component.html',
  styleUrls: ['./bidding-evaluasi.component.scss'],
})
export class BiddingEvaluasiComponent implements OnInit {
  daftarBidding: any[] = [];

  constructor(private ajukanPenawaranService: AjukanPenawaranService) {}

  ngOnInit(): void {
    this.loadBiddingData();
  }

  // Fungsi untuk mengambil data bidding vendor
  loadBiddingData() {
    this.ajukanPenawaranService.getPenawaranVendor().subscribe({
      next: (data) => {
        this.daftarBidding = data;
      },
      error: (err) => {
        alert('Gagal memuat data bidding');
        console.error(err);
      },
    });
  }

  // Fungsi untuk mengupdate harga penawaran
  submitBidding(item: any) {
    if (item.harga_penawaran && item.id) {
      this.ajukanPenawaranService.updateHargaPenawaran(item.id, item.harga_penawaran).subscribe({
        next: () => {
          alert(`Penawaran untuk ${item.nama_proyek} berhasil diperbarui.`);
        },
        error: (err) => {
          alert('Gagal mengupdate harga penawaran');
          console.error(err);
        },
      });
    }
  }
}
